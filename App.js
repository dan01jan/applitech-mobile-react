import { StatusBar } from 'expo-status-bar';
import { Box, NativeBaseProvider, Text } from 'native-base';
import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import NotVerifyScreen from './src/Screens/NotVerifyScreen';
import HomeScreen from './src/Screens/HomeScreen';
import SingleProductScreen from './src/Screens/SingleProductScreen';
import CartScreen from './src/Screens/CartScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import ShippingScreen from './src/Screens/ShippingScreen';
import PaymentScreen from './src/Screens/PaymentScreen';
import PlaceOrderScreen from './src/Screens/PlaceOrderScreen';
export default function App() {
  return (
    <NativeBaseProvider>
      {/* <LoginScreen /> */}
      {/* <RegisterScreen /> */}
      {/* <NotVerifyScreen /> */}
      {/* <HomeScreen/> */}
      {/* <SingleProductScreen /> */}
      {/* <CartScreen/> */}
      {/* <ProfileScreen/> */}
      {/* <ShippingScreen/> */}
      {/* <PaymentScreen/> */}
    <PlaceOrderScreen/>
    </NativeBaseProvider>
  );
}
