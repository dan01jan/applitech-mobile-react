import { Center, Heading, Text } from 'native-base'
import React from 'react'
import Colors from '../color'
import Tabs from '../Components/Profile/Tabs'
import { View, Image } from 'react-native';

function ProfileScreen() {
  return (
    <>
    <Center bg={Colors.main} pt={10} pb={6}>
    <View style={{ borderRadius: 50, overflow: 'hidden' }}>
      <Image
        source={{ uri: "https://res.cloudinary.com/do2utxjmc/image/upload/v1700884184/avatars/e7lybxmp44roqyoroqwl.jpg" }}
        style={{ width: 100, height: 100}}
        resizeMode="cover"
      />
    </View>
      <Heading bold fontSize={15} isTruncated my={2} color={Colors.white}>
        User Me
      </Heading>
      <Text italick fontSize={10} color={Colors.white}>
        Joined March 14 2024
      </Text>
    </Center>
    {/* Tabs */}
    <Tabs/>
   </>
  
  )
}

export default ProfileScreen