import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

enum Screen {
  Page1,
  Page2,
  Page3,
  Me,
}

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Page1);

  const renderCanvas = () => {
    switch (currentScreen) {
      case Screen.Page1:
        return (
          <View style={styles.canvasCenter}>
            <Text style={styles.text}>This is Guest Page 1</Text>
          </View>
        );
      case Screen.Page2:
        return (
          <View style={styles.canvasCenter}>
            <Text style={styles.text}>This is Guest Page 2</Text>
          </View>
        );
      case Screen.Page3:
        return (
          <View style={styles.canvasCenter}>
            <Text style={styles.text}>This is Guest Page 3</Text>
          </View>
        );
      case Screen.Me:
        return (
          <Image
            source={require('./assets/backgroud_me.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvas}>{renderCanvas()}</View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: '#732626' }]}
          onPress={() => setCurrentScreen(Screen.Page1)}
        />
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: '#2f4f2f' }]}
          onPress={() => setCurrentScreen(Screen.Page2)}
        />
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: '#f4c542' }]}
          onPress={() => setCurrentScreen(Screen.Page3)}
        />
        <TouchableOpacity style={styles.profileButton} onPress={() => setCurrentScreen(Screen.Me)}>
          <Image source={require('./assets/profile-icon.png')} style={styles.icon} />
          <Text style={styles.iconLabel}>Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  canvas: {
    flex: 1,
    backgroundColor: '#7CFC00', // Lime green
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvasCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  profileButton: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconLabel: {
    fontSize: 12,
    color: '#732626',
    marginTop: 2,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});


