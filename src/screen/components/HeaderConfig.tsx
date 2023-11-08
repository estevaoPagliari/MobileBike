import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { propsStack } from '../../routes/model'

export default function HeaderProfile({ name }) {
  const navegation = useNavigation<propsStack>()
  return (
    <View style={styles.containerheader}>
      <TouchableOpacity
        style={styles.buttonprofile}
        onPress={() => {
          navegation.navigate('Home')
        }}
      >
        <Icon name="arrow-left" size={30} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.textheader}>{name}</Text>

      <TouchableOpacity
        style={styles.buttonsettings}
        onPress={() => {
          navegation.navigate('Configuration')
        }}
      >
        <Icon name="settings" size={30} color="#fff" />
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
  containerheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0D9488',
    padding: '6%',
    top: '5.5%',
  },
  buttonsettings: {},
  buttonprofile: {},
  textheader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})
