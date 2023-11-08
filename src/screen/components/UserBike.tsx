import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import Modal from 'react-native-modal'
import * as SecureStore from 'expo-secure-store'
import jwtDecode from 'jwt-decode'
import { api } from '../../api/api'

interface DecodedToken {
  sub: string // Altere o tipo conforme a estrutura do seu token
}

export default function UserBike() {
  const [isModalVisible, setModalVisible] = useState(false)
  const [apiStatus, setApiStatus] = useState('')
  const [isIdBike, setIdBike] = useState<string>(null)
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
    setApiStatus(null)
  }
  async function UserBike(IdBike: string) {
    try {
      const token = await SecureStore.getItemAsync('token')
      const decodedToken = jwtDecode<DecodedToken>(token)
      const userId = decodedToken.sub
      const response = await api.patch(`/bikes/user/${IdBike}`, {
        userId,
      })
      if (response.status === 200) {
        setApiStatus('Bike cadastrada com sucesso!')
      } else {
        setApiStatus('Erro em cadastra a Bike! Tente novamente!')
      }
    } catch (error) {
      setApiStatus('Erro em cadastra a Bike! Tente novamente!')
      console.error('Erro na solicitação GET:', error)
    }
  }
  return (
    <Animatable.View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      animation="fadeInUp"
      delay={500}
    >
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          backgroundColor: '#0D9488',
          borderRadius: 20,
        }}
        onPress={toggleModal}
      >
        <MaterialCommunityIcons name="bike-fast" size={100} color="white" />
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            width: '70%',
            left: '10%',
            color: 'white',
          }}
        >
          Ola, você não possui bike cadastrada, aperte aqui e adicione a sua
          bike !
        </Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={styles.containermodalbike}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: 10,
            }}
          >
            <TouchableOpacity onPress={toggleModal} style={{ padding: 0 }}>
              <Feather name="arrow-left" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                padding: 10,
              }}
            >
              Informe o número de série da sua bike
            </Text>
            <TextInput
              style={styles.inputid}
              placeholder="Número de série"
              value={isIdBike}
              onChangeText={(text) => setIdBike(text)}
            />
            <Text>{apiStatus}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '80%',
                top: 10,
                padding: 10,
              }}
            >
              <TouchableOpacity
                style={styles.buttonmodel}
                onPress={toggleModal}
              >
                <Text style={styles.textbuttonmodel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonmodel}
                onPress={() => UserBike(isIdBike)}
              >
                <Text style={styles.textbuttonmodel}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  containermiddle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  containermodalbike: {
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  inputid: {
    borderWidth: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    padding: 1,
    height: 40,
    width: '90%',
    fontSize: 18,
    fontWeight: '300',
  },
  buttonmodel: {
    backgroundColor: '#0D9488',
    padding: 10,
    borderRadius: 10,
  },
  textbuttonmodel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
})
