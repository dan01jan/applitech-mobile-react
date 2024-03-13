import { StatusBar } from 'expo-status-bar';
import { Box, NativeBaseProvider, Text } from 'native-base';
import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
export default function App() {
  return (
    <NativeBaseProvider>
      {/* <LoginScreen /> */}
      <RegisterScreen />
    </NativeBaseProvider>
  );
}
