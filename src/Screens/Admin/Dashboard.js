import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import Header from './Header'; // Import Header component
import Sidebar from './Sidebar'; // Import Sidebar component

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigation(); // Initialize navigation

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
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
      <Header title="Dashboard" onPress={toggleSidebar} />
      {/* Sidebar */}
      {sidebarVisible && <Sidebar items={sidebarItems} />}
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
  mainContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Dashboard;
