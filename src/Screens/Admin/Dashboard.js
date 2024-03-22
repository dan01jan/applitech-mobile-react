import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Sidebar from './Sidebar';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit'; // Import BarChart
import axios from 'axios';
import baseURL from '../../../assets/common/baseurl';
import { ScrollView } from 'native-base';

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [orderChartData, setOrderChartData] = useState(null);
  const [countryChartData, setCountryChartData] = useState(null); // State for orders by country
  const navigation = useNavigation();

  const sidebarItems = [
    { id: 1, title: 'Home', screen: 'Main' },
    { id: 2, title: 'Product', screen: 'ProductForm' },
    { id: 3, title: 'Brand', screen: 'BrandForm' },
    { id: 4, title: 'Order', screen: 'OrderAdmin' },
  ];

  useEffect(() => {
    fetchData();
    fetchOrderChartData();
    fetchCountryChartData(); // Fetch data for the new country chart
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}products`);
      const products = response.data;
      
      products.sort((a, b) => a.price - b.price);
      
      const lowestPrices = products.slice(0, 2);
      const highestPrices = products.slice(-2);
      const middlePrice = products[Math.floor(products.length / 2)];
      const selectedProducts = [...lowestPrices, middlePrice, ...highestPrices];
      
      const chartData = {
        labels: selectedProducts.map(product => ''),
        datasets: [
          {
            data: selectedProducts.map(product => product.price),
          },
        ],
      };
      
      setChartData(chartData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchOrderChartData = async () => {
    try {
      const response = await axios.get(`${baseURL}orders`);
      const ordersData = response.data;

      const ordersByMonth = {};
      ordersData.forEach(order => {
        const dateOrdered = new Date(order.dateOrdered);
        const month = dateOrdered.getMonth() + 1; // Month is zero-based
        ordersByMonth[month] = (ordersByMonth[month] || 0) + 1;
      });

      const labels = Object.keys(ordersByMonth).map(month => {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[parseInt(month) - 1];
      });
      const data = Object.values(ordersByMonth);

      setOrderChartData(labels.map((label, index) => ({
        name: label,
        data: data[index],
        color: getRandomColor(), // Add random color
      })));
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  const fetchCountryChartData = async () => {
    try {
      const response = await axios.get(`${baseURL}orders`);
      const ordersData = response.data;

      const ordersByCountry = {};
      ordersData.forEach(order => {
        const country = order.country;
        ordersByCountry[country] = (ordersByCountry[country] || 0) + 1;
      });

      const labels = Object.keys(ordersByCountry);
      const data = Object.values(ordersByCountry);

      setCountryChartData(labels.map((label, index) => ({
        name: label,
        data: data[index],
        color: getRandomColor(), // Add random color
      })));
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const styles = StyleSheet.create({
    chartTitle: {
      fontSize: 34,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    container: {
      flex: 1,
    },
    mainContent: {
      flex: 1,
      backgroundColor: '#ffffff',
      padding: 20,
      alignItems: 'center',
    },
    chartContainer: {
      marginBottom: 20,
    },
  });
  const colors = ['#FF5733', '#FFC300', '#36A2EB', '#4BC0C0', '#9966FF', '#FF6384', '#FFCE56'];
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Header title="Dashboard" onPress={toggleSidebar} />
        {sidebarVisible && <Sidebar items={sidebarItems} />}
        <View style={styles.mainContent}>
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Products and Prices Chart</Text>
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
                  fromZero: true,
                }}
                bezier
                style={{
                  borderRadius: 16,
                }}
              />
            )}
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Orders by Month</Text>
            {orderChartData && (
  <BarChart
    data={{
      labels: orderChartData.map(data => data.name),
      datasets: [{
        data: orderChartData.map(data => data.data),
        color: (opacity = 1) => colors,
      }]
    }}
    width={300}
    height={200}
    yAxisLabel=""
    chartConfig={{
      backgroundColor: '#ffffff',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    }}
    style={{
      borderRadius: 16,
    }}
  />
)}

          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Orders by Country</Text>
            {countryChartData && (
              <PieChart
                data={countryChartData}
                width={300}
                height={200}
                chartConfig={{
                  backgroundColor:
'#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="data"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
