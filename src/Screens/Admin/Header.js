import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import DashboardImg from '../../../assets/images/Dashboard.png';

const Header = ({ title, onPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPress} style={styles.toggleButton}>
        <FontAwesome name="bars" size={20} color="black" />
      </TouchableOpacity>
      <View style={styles.headerImageContainer}>
      <Image source={DashboardImg} style={[styles.headerImage, { width: 200, height: 40 }]} />
        {/* <Text style={styles.headerText}>{title}</Text> */}
      </View>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8CDD5',
    padding: 10,
  },
  headerImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 40,
    height: 40, // Set the height of the image as needed
    marginRight: 10, // Add spacing between image and text
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  toggleButton: {
    padding: 10,
  },
  placeholder: {
    width: 40, // Adjust width as needed
  },
});

export default Header;
