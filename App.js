import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, StatusBar } from 'native-base';
import LoginScreen from './src/Screens/LoginScreen';
import OrderScreen from './src/Screens/OrderScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import BottomNav from './src/Navigations/BottomNav';
import AdminProduct from './src/Screens/Admin/ProductForm'
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <Stack.Navigator
          initialRouteName="AdminProduct"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Order" component={OrderScreen} />
          {/* Add a Screen for BottomNav */}
          <Stack.Screen name="Main" component={BottomNav} />
          <Stack.Screen name = "AdminProduct" component = {AdminProduct}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
