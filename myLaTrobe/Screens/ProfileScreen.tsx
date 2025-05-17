/**
 * @file ProfileScreen.tsx
 * @brief CSE3MAD-Assessment 1 Part 2
 *
 * @author Ry Thomas McLean (21723607)
 *
 * @copyright
 * Copyright (C) 2025  Ry Thomas McLean
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 **/

import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useUser } from '../UserContext';
import images from '../Assets/ResourceMap';

const accessDoor = true;

const ProfileScreen = () => {
  const { profile } = useUser();
  const user = profile[0];
  const userType = user.customfields.find(f => f.shortname === 'user_type')?.value;

  return (
    <ImageBackground
      source={images['profile-background']}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.card}>
        <View style={styles.profileWrapper}>
          <Image
            source={images['profileImage'] || images['profile-fallbackProfile']}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.userType}>{userType}</Text>
          <Text style={styles.name}>{user.firstname} {user.lastname}</Text>

          {/* Circular background + QRCode in front via wrapper */}
          <View style={styles.qrContainer}>
            <View style={styles.qrCodeWrapper}>
              <QRCode
                value={user.idnumber}
                size={180}
                color="rgba(0,0,0,1.0)"
                backgroundColor="transparent"
              />
            </View>
          </View>

          <View style={styles.infoColumn}>
  <View style={styles.idBox}>
    <Text style={styles.label}>Student ID</Text>
    <Text style={styles.idText}>{user.idnumber}</Text>
  </View>

  <View style={styles.signatureBox}>
              <Image
                source={images['profileSignature'] || images['profile-fallbackSignature']}
                style={styles.signatureImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,1.0)',
    borderRadius: 15,
    width: '90%',
    paddingTop: 140,
    alignItems: 'center',
    elevation: 5,
    position: 'relative',
  },
  profileWrapper: {
    position: 'absolute',
    top: -110,
    zIndex: 2,
  },
  profileImage: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 6,
    borderColor: 'rgba(252,0,8,1.0)',
    backgroundColor: 'rgba(255,255,255,1.0)',
    shadowColor: 'rgba(0,0,0,1.0)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardContent: {
    alignItems: 'center',
    width: '100%',
  },
  userType: {
    color: 'rgba(252,0,8,1.0)',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  name: {
    color: 'rgba(0,0,0,1.0)',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
  },
  qrContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  
  qrCodeWrapper: {
    position: 'absolute',
    zIndex: 2,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    gap: 20,
  },
  idBox: {
    width: 150,
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 2,
  },
  signatureBox: {
    width: 180,
    marginLeft: -10,
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
    color: 'rgba(0,0,0,1.0)',
    marginBottom: 5,
    textAlign: 'center',
  },
  idText: {
    fontSize: 16,
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    color: 'rgba(0,0,0,1.0)',
    textAlign: 'center',
  },
  signatureImage: {
    width: 150,
    height: 80,
    backgroundColor: 'rgba(147,197,227,0.0)',
    borderRadius: 5,
  },
});

export default ProfileScreen;



