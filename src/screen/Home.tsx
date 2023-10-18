import React, { useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { propsStack } from '../routes/model'
import { LinearGradient } from 'expo-linear-gradient'
import { api } from '../api/api'
import jwtDecode from 'jwt-decode'
import User from '../api/User'
import Bike from '../api/Bike'

interface DecodedToken {
  sub: string // Altere o tipo conforme a estrutura do seu token
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [bikes, setBike] = useState<Bike | null>(null)
  const [isLoading, setIsLoading] = useState(false) // Estado para controlar o carregamento
  const [isLoadingBike, setIsLoadingBike] = useState(false) // Estado para controlar o carregamento
  const navegation = useNavigation<propsStack>()
  async function signOut() {
    const signOutFunc = await SecureStore.deleteItemAsync('token')
    navegation.navigate('Welcome')
  }

  async function loadUser() {
    try {
      const token = await SecureStore.getItemAsync('token')
      const decodedToken = jwtDecode<DecodedToken>(token)
      const userId = decodedToken.sub
      const response = await api.get<User>(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(response.data)

      setIsLoading(true)
    } catch (error) {
      console.error('Erro na solicitação GET:', error)
    }
  }
  async function loadBike() {
    try {
      const token = await SecureStore.getItemAsync('token')
      const decodedToken = jwtDecode<DecodedToken>(token)
      const userId = decodedToken.sub
      const response = await api.get<Bike>(`/bikesstatus/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log('RETURN BIKE', response.data[0])
      setBike(response.data[0])
      setIsLoadingBike(true)
    } catch (error) {
      console.error('Erro na solicitação GET:', error)
    }
  }

  useEffect(() => {
    // Simulação de carregamento de dados do usuário
    setTimeout(() => {
      loadUser()
      loadBike()
    }, 8000)
  }, [])

  return (
    <View style={styles.containercarregando}>
      {isLoading ? (
        // Inicio Container Geral
        <View style={styles.container}>
          {/** Inicio Container Header */}
          <View style={styles.containerheader}>
            <TouchableOpacity style={styles.buttonprofile}>
              <Icon name="user" size={30} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.textheader}>{user.name}</Text>

            <TouchableOpacity style={styles.buttonsettings}>
              <Icon name="settings" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
          {/** Fim Container Header */}

          <View style={styles.containermiddle}>
            <View style={styles.containerbike}>
              <LinearGradient
                colors={['#D7EDEB', '#CDE9E6', '#9CD3CE', '#83C8C2']}
                start={{ x: 0, y: 0.5 }} // Cores do gradiente (você pode adicionar quantas cores quiser)
                style={{ borderRadius: 10 }}
              >
                <View style={styles.containerbiketitle}>
                  {user.bike.map((bike) => (
                    <Text
                      key={bike.id}
                      style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: '#2E2E2E',
                      }}
                    >
                      {bike.name}
                    </Text>
                  ))}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ fontSize: 19, fontWeight: 'bold' }}>
                      Conectado
                    </Text>
                    <Entypo
                      style={{ left: 3, top: 2 }}
                      name="controller-record"
                      size={24}
                      color="#ff0000"
                    />
                  </View>
                </View>
              </LinearGradient>

              <View style={styles.containerbikestatus}>
                <Image
                  style={styles.imagenbike}
                  resizeMode="center"
                  source={require('../assets/bike_teste.png')}
                />
                <View style={styles.containerbiketext}>
                  <View style={styles.containerbattery}>
                    <Entypo name="battery" size={50} color="#0D9488" />
                    {bikes ? (
                      <View>
                        {bikes.status.map((statusbike, index) => (
                          <Text key={index} style={styles.textbikeinfo}>
                            {statusbike.battery}
                          </Text>
                        ))}
                      </View>
                    ) : (
                      <ActivityIndicator size="large" color="#0D9488" />
                    )}

                    <Text style={{ fontSize: 23, left: 0, top: 3 }}> %</Text>
                  </View>
                  <View style={styles.containerbattery}>
                    <Ionicons
                      name="speedometer-outline"
                      size={50}
                      color="#0D9488"
                    />
                    {bikes ? (
                      <View>
                        {bikes.status.map((statusbike, index) => (
                          <Text key={index} style={styles.textbikeinfo}>
                            {statusbike.battery}
                          </Text>
                        ))}
                      </View>
                    ) : (
                      <ActivityIndicator size="large" color="#0D9488" />
                    )}

                    <Text style={{ fontSize: 23, left: 0, top: 3 }}> Km</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        // Fim Container Geral
        <View style={styles.ActivityIndicator}>
          <ActivityIndicator size="large" color="#0D9488" />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D9488',
  },
  containercarregando: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0D9488',
    padding: '6%',
    top: '5.5%',
  },
  containermiddle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  containerbike: {
    width: '100%',
    height: '25%',
    top: '2%',
    borderRadius: 10,
    borderWidth: 0.4,
    borderColor: '#0D9488',
    backgroundColor: '#fbfbfb',
  },
  containerbiketitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 5,
  },
  containerbikestatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: '2%',
  },
  textcontainerbike: {
    flex: 1,
  },
  containerbiketext: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '90%',
    borderLeftWidth: 0.5,
    borderColor: '#000',
    bottom: 5,
  },
  containerbattery: {
    flexDirection: 'row', // Isso alinha os elementos horizontalmente
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5%',
  },

  buttonsettings: {},
  buttonprofile: {},
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  textheader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  textbikeinfo: {
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  ActivityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  imagenbike: {
    width: '50%',
    height: '100%',
  },
})
