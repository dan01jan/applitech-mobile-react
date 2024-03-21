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
import AdminBrand from './src/Screens/Admin/BrandForm'
// import OrderModel from './src/Components/OrderModel'
import PlaceOrderModel from './src/Components/PlaceOrderModel';
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
            {/* Add a Screen for BottomNav */}
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="AdminProduct" component={AdminProduct} />
            <Stack.Screen name="AdminBrand" component={AdminBrand} />
            <Stack.Screen name="Main" component={BottomNav} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
    </Auth>
  );
}
