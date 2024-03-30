// Header.js
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import DashboardImg from '../../../assets/images/Dashboard.png';

const Header = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.header}>
      <View style={styles.headerImageContainer}>
        <Image source={DashboardImg} style={styles.headerImage} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8CDD5',
    padding: 10,
  },
  headerImageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerImage: {
    width: 200,
    height: 40,
  },
});

export default Header;
