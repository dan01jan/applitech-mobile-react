import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { Provider } from 'react-redux'; 
import store from './Redux/store'; 
import LoginScreen from './src/Screens/LoginScreen';
import OrderScreen from './src/Screens/OrderScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import BottomNav from './src/Navigations/BottomNav';
import Dashboard from './src/Screens/Admin/Dashboard';
import AdminProduct from './src/Screens/Admin/ProductForm'
import BrandForm from './src/Screens/Admin/BrandForm'
import ProductForm from './src/Screens/Admin/ProductForm'
// import OrderModel from './src/Components/OrderModel'
import PlaceOrderModel from './src/Components/PlaceOrderModel';
import PlaceOrderScreen from './src/Screens/PlaceOrderScreen';
// import PlaceOrderScreenOLD from './src/Screens/PlaceOrderScreenOLD';
import Order from './src/Screens/Admin/Order';
import User from  './src/Screens/Admin/User';
import Auth from './Context/Store/Auth';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Auth>
      <Provider store={store}> 
      <NativeBaseProvider>
        <NavigationContainer>
          <StatusBar hidden={true} />
          <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="OrderModel" component={PlaceOrderModel} />
            <Stack.Screen name="PlaceOrderScreen" component={PlaceOrderScreen} />
            {/* <Stack.Screen name="PlaceOrderScreenOLD" component={PlaceOrderScreenOLD} /> */}
            {/* Add a Screen for BottomNav */}
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="AdminProduct" component={AdminProduct} />
            <Stack.Screen name="BrandForm" component={BrandForm} />
            <Stack.Screen name="ProductForm" component={ProductForm} />
            <Stack.Screen name="OrderAdmin" component={Order} />
            <Stack.Screen name="UserAdmin" component={User} />

            <Stack.Screen name="Main" component={BottomNav} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
    </Auth>
  );
}
