import { Center, Heading, Text } from 'native-base'
import React from 'react'
import Colors from '../color'
import Tabs from '../Components/Profile/Tabs'
import { View, Image } from 'react-native';

function ProfileScreen() {
  return (
    <>
    <Center bg={Colors.main} pt={100} pb={6}>
    <View style={{ borderRadius: 50, overflow: 'hidden' }}>
     
    </View>
    </Center>
    {/* Tabs */}
    <Tabs/>
   </>
  
  )
}

export default ProfileScreen