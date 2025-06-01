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
import { View, Text, Image, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useUser } from '../UserContext';
import images from '../Assets/ResourceMap';

const ProfileScreen = () => {
  const { profile } = useUser();
  
  // Add safety check for profile data
  if (!profile || !profile[0]) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="rgba(216,7,22,1.0)" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  const user = profile[0];
  const userType = user.customfields?.find(f => f.shortname === 'user_type')?.value || 'Student';

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
            defaultSource={images['profile-fallbackProfile']} // Fallback for Android
          />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.userType}>{userType}</Text>
          <Text style={styles.name}>{user.firstname || 'N/A'} {user.lastname || ''}</Text>

          {/* QR Code Container with white background for better visibility */}
          <View style={styles.qrContainer}>
            <View style={styles.qrCodeWrapper}>
              <QRCode
                value={user.idnumber || 'No ID Available'}
                size={160}
                color="rgba(0,0,0,1.0)"
                backgroundColor="rgba(255,255,255,1.0)" // White background for better visibility
              />
            </View>
          </View>

          <View style={styles.infoColumn}>
            <View style={styles.idBox}>
              <Text style={styles.label}>Student ID</Text>
              <Text style={styles.idText}>{user.idnumber || 'N/A'}</Text>
            </View>

            <View style={styles.signatureBox}>
              <Image
                source={images['profileSignature'] || images['profile-fallbackSignature']}
                style={styles.signatureImage}
                resizeMode="contain"
                defaultSource={images['profile-fallbackSignature']}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'rgba(216,7,22,1.0)',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,1.0)',
    borderRadius: 15,
    width: '90%',
    paddingTop: 140,
    paddingBottom: 30, // Add bottom padding
    alignItems: 'center',
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
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
  },
  cardContent: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
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
    textAlign: 'center',
  },
  qrContainer: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,1.0)',
    borderRadius: 15,
    padding: 10,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  qrCodeWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 10,
  },
  idBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(248,248,248,1.0)',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  signatureBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(248,248,248,1.0)',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  label: {
    fontWeight: 'bold',
    color: 'rgba(0,0,0,1.0)',
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 14,
  },
  idText: {
    fontSize: 16,
    color: 'rgba(0,0,0,1.0)',
    textAlign: 'center',
    fontWeight: '600',
  },
  signatureImage: {
    width: 100,
    height: 50,
    borderRadius: 5,
  },
});

export default ProfileScreen;



