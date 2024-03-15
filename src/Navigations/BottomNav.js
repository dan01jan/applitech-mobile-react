import { View, Text, StyleSheet, Pressable} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../Screens/ProfileScreen"
import CartScreen from "../Screens/CartScreen"
import { Center } from "native-base";
import { Entypo, AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../color";
import StackNav from "../Navigations/StackNav"


const Tab = createBottomTabNavigator();

const CustomTab = ({ children, onPress }) => (
  <Pressable
    onPress={onPress}
    h={70}
    w={70}
    rounded="full"
    bg={color.main}
    top={-30}
    shadow={2}
    >
      {children}
  </Pressable>
)  

const BottomNav = () => {
  return (
    <Tab.Navigator
      backBehavior="Main"
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
        component={StackNav}
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

<Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarButton: (props) => <CustomTab {...props}/>,
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <FontAwesome5 name="shopping-basket" size={24} color={color.black} />
              ) : (
                <MaterialCommunityIcons name="shopping-outline" size={24} color={color.black} />
              )}
            </Center>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              { focused ? (
                <FontAwesome name="user" size={24} color={color.main}/>
              ) : (
                <AntDesign name="user" size={24} color={color.black}/>
              )}
            </Center>
          )
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
        // paddingTop: 15,
    }
})
export default BottomNav;
