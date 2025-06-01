/**
 * @file App.tsx
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

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
  InteractionManager,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { UserProvider } from './UserContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import StudentsScreen from './Screens/StudentsScreen';
import PasswordScreen from './Screens/PasswordScreen';
import ProfileScreen from './Screens/ProfileScreen';
import OutlookScreen from './Screens/OutlookScreen';
import Microsoft365Screen from './Screens/Microsoft365Screen';
import ZoomScreen from './Screens/ZoomScreen';
import ContactUsScreen from './Screens/ContactUsScreen';
import MapScreen from './Screens/MapViewScreen';
import HelpAndSupportScreen from './Screens/HelpAndSupportScreen';
import ChatbotScreen from './Screens/ChatbotScreen';
import PhoneCallScreen from './Screens/PhoneCallScreen';

import images from './Assets/ResourceMap';

const { height } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

const groupedCategories = [
  {
    title: 'Student',
    color: 'rgba(216,7,22,1.0)',
    items: [
      { id: '1', label: 'Profile', image: images['profileImageSmall']},
      { id: '2', label: 'Outlook', image: images['menu-outlook'] },
      { id: '3', label: 'Microsoft 365', image: images['menu-microsoft365'] },
      { id: '4', label: 'Zoom', image: images['menu-zoom'] },
      { id: '5', label: 'Help And Support', image: images['menu-helpAndSupport'] },
    ]
  },
  {
    title: 'Support',
    color: 'rgba(216,7,22,1.0)',
    items: [
      { id: '6', label: 'Chatbot', image: images['menu-chatbot'] }
    ]
  },
  {
    title: 'University',
    color: 'rgba(216,7,22,1.0)',
    items: []
  },
  {
    title: 'Contact',
    color: 'rgba(216,7,22,1.0)',
    items: [
      { id: '7', label: 'Contact Us', image: images['menu-contactUs'] },
      { id: '8', label: 'Map', image: images['menu-map'] },
      { id: '9', label: 'Help', image: images['menu-help']}
    ]
  }
];

function MenuOverlay({ visible, setVisible, navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Use InteractionManager to ensure animations happen after interactions complete
      InteractionManager.runAfterInteractions(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible, fadeAnim]);

  const handleItemPress = useCallback((label) => {
    // Ensure UI updates happen on the next frame
    requestAnimationFrame(() => {
      setVisible(false);
      // Small delay before navigation to prevent UI conflicts
      setTimeout(() => {
        navigation.navigate(label);
      }, 100);
    });
  }, [navigation, setVisible]);

  const handleBackdropPress = useCallback(() => {
    requestAnimationFrame(() => {
      setVisible(false);
    });
  }, [setVisible]);

  return (
    <Modal 
      isVisible={visible} 
      onBackdropPress={handleBackdropPress}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      avoidKeyboard={true}
    >
      <View style={{ 
        backgroundColor: 'white', 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        padding: 20, 
        maxHeight: height * 0.8 
      }}>
        <View style={{
          width: 40,
          height: 4,
          backgroundColor: '#ccc',
          borderRadius: 2,
          alignSelf: 'center',
          marginBottom: 15,
        }} />
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          removeClippedSubviews={Platform.OS === 'android'}
        >
          {groupedCategories.map((group) => (
            <View key={group.title} style={{ marginBottom: 25 }}>
              <Text style={{ 
                fontWeight: 'bold', 
                fontSize: 18, 
                marginBottom: 15, 
                color: group.color 
              }}>
                {group.title}
              </Text>
              {group.items.map((item) => (
                <Animated.View key={item.id} style={{ opacity: fadeAnim }}>
                  <TouchableOpacity
                    style={{ 
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      marginBottom: 12,
                      padding: 12,
                      borderRadius: 10,
                      backgroundColor: '#f8f9fa',
                      ...Platform.select({
                        ios: {
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.1,
                          shadowRadius: 2,
                        },
                        android: {
                          elevation: 2,
                        },
                      }),
                    }}
                    onPress={() => handleItemPress(item.label)}
                    activeOpacity={0.7}
                  >
                    <Image 
                      source={item.image} 
                      style={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: 8, 
                        marginRight: 15 
                      }}
                      onError={() => console.log('Image load error for:', item.label)}
                    />
                    <Text style={{ 
                      fontSize: 16, 
                      flex: 1,
                      color: '#333',
                      fontWeight: '500'
                    }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

function MainApp() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const handleMenuPress = useCallback(() => {
    requestAnimationFrame(() => {
      setMenuVisible(true);
    });
  }, []);

  const handleChatPress = useCallback(() => {
    requestAnimationFrame(() => {
      navigation.navigate('Chatbot');
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'rgba(27,27,27,1.0)',
          },
          headerTintColor: 'rgba(255,255,255,1.0)', 
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animation: 'slide_from_right', // Smoother animation
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Students" component={StudentsScreen} />
        <Stack.Screen name="Password" component={PasswordScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Outlook" component={OutlookScreen} />
        <Stack.Screen name="Microsoft 365" component={Microsoft365Screen} />
        <Stack.Screen name="Zoom" component={ZoomScreen} />
        <Stack.Screen name="Contact Us" component={ContactUsScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Help And Support" component={HelpAndSupportScreen} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />
        <Stack.Screen name="Help" component={PhoneCallScreen} />
      </Stack.Navigator>

      {/* Floating Action Buttons */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          backgroundColor: 'rgba(216,7,22,1.0)',
          width: 60,
          height: 60,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            },
            android: {
              elevation: 8,
            },
          }),
        }}
        onPress={handleMenuPress}
        activeOpacity={0.8}
      >
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 110,
          right: 30,
          backgroundColor: 'rgba(216,7,22,1.0)',
          width: 60,
          height: 60,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            },
            android: {
              elevation: 8,
            },
          }),
        }}
        onPress={handleChatPress}
        activeOpacity={0.8}
      >
        <Icon name="comment" size={24} color="white" />
      </TouchableOpacity>

      <MenuOverlay visible={menuVisible} setVisible={setMenuVisible} navigation={navigation} />
    </View>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <MainApp />
      </NavigationContainer>
    </UserProvider>
  );
}
