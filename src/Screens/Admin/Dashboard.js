import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Sidebar from './Sidebar';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios'; // Import Axios for making HTTP requests
import baseURL from '../../../assets/common/baseurl';

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [chartData, setChartData] = useState(null); // State to hold chart data
  const navigation = useNavigation();

  // Define the sidebar items
  const sidebarItems = [
    { id: 1, title: 'Product', screen: 'AdminProduct' },
    { id: 2, title: 'Brand', screen: 'AdminBrand' },
    // Add more sidebar items as needed
  ];

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}products`); // Make GET request to your API
      const products = response.data; // Assuming your API returns an array of products
      
      // Sort products by price in ascending order
      products.sort((a, b) => a.price - b.price);
      
      // Extract the two lowest, middle, and two highest prices
      const lowestPrices = products.slice(0, 2);
      const highestPrices = products.slice(-2);
      const middlePrice = products[Math.floor(products.length / 2)]; // Middle price
      const selectedProducts = [...lowestPrices, middlePrice, ...highestPrices]; // Combine prices
      
      const chartData = {
        labels: selectedProducts.map(product => ''), // Empty string to remove names at the bottom
        datasets: [
          {
            data: selectedProducts.map(product => product.price), // Use product prices as data
          },
        ],
      };
      
      setChartData(chartData); // Set chart data state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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

  return (
    <View style={styles.container}>
      <Header title="Dashboard" onPress={toggleSidebar} />
      {sidebarVisible && <Sidebar items={sidebarItems} />}
      <View style={styles.mainContent}>
        <Text>Products and Prices Chart</Text>
        {chartData && (
          <LineChart
            data={chartData}
            width={300}
            height={200}
            yAxisLabel="$"
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              fromZero: true, // Start the chart from zero on the y-axis
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Dashboard;