import { View, Text, StyleSheet} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import { Center } from "native-base";
import { Entypo, AntDesign } from "@expo/vector-icons";
import color from "../color";


const Tab = createBottomTabNavigator();

const customTab = ({ children, onPress }) => <Text>hh</Text>; // Example custom tab component   

const BottomNav = () => {
  return (
    <Tab.Navigator
      backBehavior="main"
      initialRouteName="Main"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { ...styles.tab },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Main"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <Entypo name="home" size={24} color={color.main} />
              ) : (
                <AntDesign name="home" size={24} color={color.black} />
              )}
            </Center>
          ),
        }}
      />
      {/* Example of using customTab component */}
      {/* <Tab.Screen name="Custom" component={customTab} /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
    tab: {
        elevation: 0,
        backgroundColor: color.white,
        height: 60,
    }
})
export default BottomNav;
