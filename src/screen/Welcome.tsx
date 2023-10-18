import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { propsStack } from '../routes/model'
import * as Animatable from 'react-native-animatable'

export default function Welcome() {
  const navegation = useNavigation<propsStack>()
  return (
    <View style={styles.container}>
      {/** // eslint-disable-next-line jsx-a11y/alt-text */}
      <View style={styles.containerlogo}>
        <Animatable.Image
          source={require('../assets/logo.png')}
          animation="lightSpeedIn"
          delay={500}
          style={{ width: '100%' }}
          resizeMode="contain"
        />
      </View>
      <Animatable.View
        animation="slideInUp"
        delay={500}
        style={styles.containerform}
      >
        <Text style={styles.title}>Bem-Vindo ao AiBike</Text>
        <Text style={styles.text}>Seu app de bike inteligente</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navegation.navigate('SignIn')
          }}
        >
          <Text style={styles.textbutton}>Entrar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerlogo: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerform: {
    flex: 1,
    backgroundColor: '#0D9488',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '5%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    paddingBottom: 10,
  },
  button: {
    backgroundColor: 'white',
    width: '60%',
    height: '15%',
    position: 'absolute',
    bottom: '30%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbutton: {
    fontSize: 30,
    fontWeight: 'bold',
  },
})
