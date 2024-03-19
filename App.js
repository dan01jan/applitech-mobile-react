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

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}> 
      <NativeBaseProvider>
        <NavigationContainer>
          <StatusBar hidden={true} />
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            {/* Add a Screen for BottomNav */}
            <Stack.Screen name="Main" component={BottomNav} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
