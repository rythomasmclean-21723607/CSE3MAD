/**
 * @file PhoneCallScreen.tsx
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
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const PhoneCallScreen = () => {
  const handleCall = () => {
    Linking.openURL('tel:+9479 2222');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.callButton} onPress={handleCall}>
        <Text style={styles.callText}> Call For Help</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  callText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
