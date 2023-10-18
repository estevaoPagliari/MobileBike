import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { propsStack } from '../routes/model'
import { useNavigation } from '@react-navigation/native'

export default function NewUser() {
  const navegation = useNavigation<propsStack>()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New User</Text>
      <TouchableOpacity onPress={() => navegation.navigate('SignIn')}>
        <Text>Voltar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
})
