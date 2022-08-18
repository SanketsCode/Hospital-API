import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useAuth from '../auth/useAuth'

export default function Home() {
  const auth = useAuth();
  return (
    <View>
      <Text>Home</Text>
      <Button title='Log out' onPress={() => auth.logout()} />
        
    </View>
  )
}

const styles = StyleSheet.create({})