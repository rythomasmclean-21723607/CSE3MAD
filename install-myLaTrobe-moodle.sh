#!/bin/bash

set -e

# Configuration variables.
MOODLE_DIR="/var/www/html/moodle"
MOODLEDATA_DIR="/var/moodledata"
DB_NAME="moodle"
DB_USER="moodleuser"
DB_PASS="moodle_test_password" # Change in production enviroment.
SITE_FULLNAME="La Trobe University"
SITE_SHORTNAME="LTU"
ADMIN_USER="admin"
ADMIN_PASS="moodle_test_password" # Change in production enviroment.
ADMIN_EMAIL="admin@mylatrobe.com"

echo "Configureing"
echo -n "  Packages: "
apt update -y
apt upgrade -y 
apt install -y nodejs git npm
apt install -y apache2 mariadb-server php php-mysql php-xml php-mbstring php-curl php-zip php-gd php-intl php-soap php-bcmath php-cli git unzip -y
echo "Done."

echo "  Services: "
echo -n "   apache: "

a2enmod rewrite

cat <<EOF > /etc/apache2/sites-available/moodle.conf
<VirtualHost *:80>
    ServerAdmin admin@mylatrobe.com
    DocumentRoot /var/www/html/moodle
    # Set globally 'ServerName localhost'

    <Directory /var/www/html/moodle>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog \${APACHE_LOG_DIR}/moodle_error.log
    CustomLog \${APACHE_LOG_DIR}/moodle_access.log combined
</VirtualHost>
EOF

sed -i '/;max_input_vars = 1000/c\max_input_vars = 5000' /etc/php/8.2/apache2/php.ini
a2ensite moodle.conf
systemctl reload apache2
echo "Done."

echo -n "   MariaDB: "

# Secure MariaDB server.
mysql -u root <<SECURE_SQL
DELETE FROM mysql.user WHERE User='';
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\_%';
FLUSH PRIVILEGES;
SECURE_SQL

# Creating Moodle database and user.
mysql -u root <<MYSQL_SCRIPT
CREATE DATABASE $DB_NAME DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
MYSQL_SCRIPT
echo "Done."

echo -n "   Moodle: "
# Clone moodle source.
cd /var/www/html
git clone https://github.com/moodle/moodle.git
chown -R www-data:www-data moodle
chmod -R 755 moodle

# Create moodledata directory.
mkdir -p $MOODLEDATA_DIR
chown -R www-data:www-data $MOODLEDATA_DIR
chmod -R 770 $MOODLEDATA_DIR

# Restart apache.
systemctl restart apache2

echo "Done."

echo "http://localhost/moodle in your browser."
