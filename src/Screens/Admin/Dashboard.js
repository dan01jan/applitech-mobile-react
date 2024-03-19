import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigation(); // Initialize navigation

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSidebarItemClick = (item) => {
    // Navigate to the desired page when a sidebar item is clicked
    navigation.navigate(item.screen); // Navigate to the screen defined in the item object
  };

  // Sidebar items
  const sidebarItems = [
    { id: 1, title: 'Product', screen: 'AdminProduct' },
    { id: 2, title: 'Brand', screen: 'AdminBrand' },
    // { id: 3, title: 'Sidebar Item 3', screen: 'Screen3' },
    // Add more items as needed
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
          <FontAwesome name={sidebarVisible ? 'times' : 'bars'} size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Dashboard</Text>
        <View style={styles.placeholder} />
      </View>
      {/* Sidebar */}
      {sidebarVisible && (
        <View style={styles.sidebar}>
          {sidebarItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.sidebarItem}
              onPress={() => handleSidebarItemClick(item)}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text>Main Content</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toggleButton: {
    padding: 10,
  },
  placeholder: {
    width: 40, // Adjust width as needed
  },
  sidebar: {
    width: '25%',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sidebarItem: {
    paddingVertical: 10,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Dashboard;
