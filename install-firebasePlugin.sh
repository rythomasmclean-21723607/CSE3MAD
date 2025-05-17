#!/bin/bash

# Exit on errors
# set -e

MOODLE_PATH="/var/www/html/moodle"
PLUGIN_NAME="firebase"
PLUGIN_DIR="$MOODLE_PATH/auth/$PLUGIN_NAME"
ZIP_NAME="moodle_auth_firebase_plugin.zip"

if [ -z "$1" ]; then
    echo "Usage: $0 <path-to-firebase-service-account.json>"
    exit 1
fi

SERVICE_ACCOUNT_SRC="$1"

apt install -y composer

echo "Unzipping plugin to $MOODLE_PATH/auth/..."
unzip -o $ZIP_NAME -d $MOODLE_PATH/auth/

# Fix nested extraction if needed
if [ -d "$MOODLE_PATH/auth/auth/$PLUGIN_NAME" ]; then
    mv $MOODLE_PATH/auth/auth/$PLUGIN_NAME $MOODLE_PATH/auth/
    rm -rf $MOODLE_PATH/auth/auth
fi

echo "Setting correct ownership to www-data..."
chown -R www-data:www-data "$PLUGIN_DIR"

echo "Setting file and folder permissions..."
find "$PLUGIN_DIR" -type f -exec chmod 644 {} \;
find "$PLUGIN_DIR" -type d -exec chmod 755 {} \;

echo "📦 Running composer install in $PLUGIN_DIR..."
cd "$PLUGIN_DIR"

composer install

cp ${SERVICE_ACCOUNT_SRC} $PLUGIN_DIR/firebase-service-account.json
chmod 600 "$PLUGIN_DIR/firebase-service-account.json"
chown www-data:www-data "$PLUGIN_DIR/firebase-service-account.json"

echo "Plugin setup complete. Visit your Moodle admin page to finish installation:"
echo "   👉 http://127.0.0.1/moodle/"
