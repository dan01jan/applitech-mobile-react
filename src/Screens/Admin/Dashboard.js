import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
          <FontAwesome name={sidebarVisible ? 'times' : 'bars'} size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>
      {/* Sidebar */}
      {sidebarVisible && (
        <View style={styles.sidebar}>
          <Text>Sidebar Content</Text>
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
  sidebar: {
    width: '25%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
