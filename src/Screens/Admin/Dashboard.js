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
      const chartData = {
        labels: products.map(product => product.name), // Use product names as labels
        datasets: [
          {
            data: products.map(product => product.price), // Use product prices as data
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
