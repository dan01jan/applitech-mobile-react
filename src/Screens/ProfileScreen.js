import { Center, Heading, Image, Text } from 'native-base'
import React from 'react'
import Colors from '../color'
import Tabs from '../Components/Profile/Tabs'

function ProfileScreen() {
  return (
    <>
    <Center bg={Colors.main} pt={10} pb={6}>
      <Image source={{uri: "https://res.cloudinary.com/do2utxjmc/image/upload/v1700884184/avatars/e7lybxmp44roqyoroqwl.jpg"}}
      alt="profile"
      w={24}
      h={24}
      resizeMode="cover"
      />
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