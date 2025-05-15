import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  useColorScheme,
  Animated,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

const { height } = Dimensions.get('window');

const categories = [
  {
    title: 'Student',
    items: [
      { id: '1', label: 'Email', image: 'https://via.placeholder.com/Email' },
      { id: '2', label: 'Xoom', image: 'https://via.placeholder.com/Xoom' },
    ],
  },
  {
    title: 'University',
    items: [{ id: '3', label: 'abpou', image: 'https://via.placeholder.com/50' }],
  },
  {
    title: 'Other',
    items: [{ id: '4', label: 'aasa', image: 'https://via.placeholder.com/50' }],
  },
];

export default function App() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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

  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>FAB-triggered Bottom Menu</Text>

      {/* Floating Action Button + Tooltip */}
      {showTooltip && <Text style={styles.tooltip}>Create New</Text>}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setVisible(true)}
        onLongPress={() => setShowTooltip(true)}
        onPressOut={() => setShowTooltip(false)}
        accessibilityLabel="Open menu"
      >
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>

      {/* Bottom Modal Menu */}
      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        style={styles.modal}
      >
        <View style={styles.sheet}>
          <ScrollView>
            {categories.map((category) => (
              <View key={category.title} style={styles.category}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                {category.items.length === 0 ? (
                  <Text style={styles.emptyText}>No items</Text>
                ) : (
                  category.items.map((item, index) => (
                    <Animated.View
                      key={item.id}
                      style={{ opacity: fadeAnim }}
                    >
                      <TouchableOpacity
                        style={styles.itemRow}
                        onPress={() => {
                          console.log(`${item.label} selected`);
                          setVisible(false);
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={styles.image}
                        />
                        <Text style={styles.itemText}>{item.label}</Text>
                      </TouchableOpacity>
                    </Animated.View>
                  ))
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function getStyles(isDark) {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: isDark ? '#000' : '#fff',
    },
    header: {
      textAlign: 'center',
      fontSize: 24,
      marginBottom: 20,
      color: isDark ? '#fff' : '#000',
    },
    tooltip: {
      position: 'absolute',
      bottom: 100,
      right: 30,
      backgroundColor: '#333',
      color: '#fff',
      padding: 8,
      borderRadius: 5,
      fontSize: 12,
    },
    fab: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      backgroundColor: 'rgba(216,7,22,1.0)',
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    sheet: {
      backgroundColor: isDark ? '#222' : 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      maxHeight: height * 0.8,
    },
    category: {
      marginBottom: 20,
    },
    categoryTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 10,
      color: isDark ? '#fff' : '#000',
    },
    emptyText: {
      fontStyle: 'italic',
      color: isDark ? '#aaa' : '#666',
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 10,
      marginRight: 10,
    },
    itemText: {
      color: isDark ? '#fff' : '#000',
    },
  });
}

