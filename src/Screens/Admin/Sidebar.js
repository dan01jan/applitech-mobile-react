// Sidebar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

const Sidebar = ({ items }) => {
  const navigation = useNavigation(); // Initialize navigation

  const handleSidebarItemClick = (screen) => {
    navigation.navigate(screen); // Navigate to the screen defined in the item object
  };

  return (
    <View style={styles.sidebar}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.sidebarItem}
          onPress={() => handleSidebarItemClick(item.screen)}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: '25%',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sidebarItem: {
    paddingVertical: 10,
  },
});

export default Sidebar;
