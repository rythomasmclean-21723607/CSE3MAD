import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import StudentsScreen from './Screens/StudentsScreen';
import PasswordScreen from './Screens/PasswordScreen';
import { UserProvider } from './UserContext';

const { height } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

const categories = [
  { id: '1', label: 'Home', image: 'https://via.placeholder.com/50' },
  { id: '2', label: 'Students', image: 'https://via.placeholder.com/50' },
  { id: '3', label: 'Password', image: 'https://via.placeholder.com/50' },
];

function MenuOverlay({ visible, setVisible, navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal isVisible={visible} onBackdropPress={() => setVisible(false)} style={{ justifyContent: 'flex-end', margin: 0 }}>
      <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: height * 0.6 }}>
        <ScrollView>
          {categories.map((item) => (
            <Animated.View key={item.id} style={{ opacity: fadeAnim }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
                onPress={() => {
                  navigation.navigate(item.label);
                  setVisible(false);
                }}
              >
                <Image source={{ uri: item.image }} style={{ width: 40, height: 40, borderRadius: 10, marginRight: 10 }} />
                <Text style={{ fontSize: 16 }}>{item.label}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

function MainApp() {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Students" component={StudentsScreen} />
        <Stack.Screen name="Password" component={PasswordScreen} />
      </Stack.Navigator>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          backgroundColor: 'red',
          width: 60,
          height: 60,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => setMenuVisible(true)}
      >
        <Icon name="plus" size={24} color="white" />
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
