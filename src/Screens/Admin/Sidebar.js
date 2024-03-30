import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons

const Sidebar = ({ items, onPressItem }) => {
  return (
    <View style={styles.sidebar}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.sidebarItem}
          onPress={() => onPressItem(item.screen)}>
          <FontAwesome name={item.icon} size={30} color="black" style={styles.icon} />
          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 60,
    bottom: 0,
    backgroundColor: '#FFEBEE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 999, // Ensure sidebar is above other content
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
    width: 30, // Adjust the width as needed
    textAlign: 'center', // Center the icon within its container
  },
  itemText: {
    // flex: 1, // Take remaining space after the icon
    fontWeight: 'bold'
    
  },
});

export default Sidebar;
