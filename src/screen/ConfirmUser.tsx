import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { propsStack } from '../routes/model'

export default function ConfirmUser() {
  const navegation = useNavigation<propsStack>()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuario Criado </Text>
      <Text style={styles.title}>Faça o Login </Text>
      <TouchableOpacity
        onPress={() => {
          navegation.navigate('SignIn')
        }}
      >
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
