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
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { propsStack } from '../routes/model'
import { LinearGradient } from 'expo-linear-gradient'
import { api } from '../api/api'
import jwtDecode from 'jwt-decode'
import User from '../api/User'
import Bike from '../api/Bike'
import AnimateNumber from 'react-native-animate-number'
import UserBike from './components/UserBike'
import Header from './components/Header'
import DecodedToken from '../api/DecodedToken'
import Odometro from './components/Odometro'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [bikes, setBike] = useState<Bike | null>(null)
  const [isLoading, setIsLoading] = useState(false) // Estado para controlar o carregamento
  const [IsLightColor, setIsLightColor] = useState('black')
  const [IsBlockColor, setIsBlockColor] = useState('black')
  const [IsBlockIcon, setIsBlockIcon] = useState<string>('lock')
  const [IsBleColor, setIsBleColor] = useState('black')
  const [apiStatus, setApiStatus] = useState('')

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
    } catch (error) {
      if (error === 500) {
        alert('Error em adcionar Bike, tente novamente')
      }
    }
  }

  function Light(IsLightColor: string) {
    if (IsLightColor === 'black') {
      setIsLightColor('white')
    } else {
      setIsLightColor('black')
    }
  }
  function Block(IsBlockColor: string) {
    if (IsBlockColor === 'black') {
      setIsBlockColor('white')
      setIsBlockIcon('lock-open')
    } else {
      setIsBlockColor('black')
      setIsBlockIcon('lock')
    }
  }
  function Ble(IsBleColor: string) {
    if (IsBleColor === 'black') {
      setIsBleColor('white')
    } else {
      setIsBleColor('black')
    }
  }

  useEffect(() => {
    // Simulação de carregamento de dados do usuário
    setTimeout(() => {
      loadUser()
      loadBike()
    }, 3000)

    const intervalo = 60000
    let intervalId: NodeJS.Timeout | null = null
    if (bikes) {
      intervalId = setInterval(() => loadBike(), intervalo)
    } else {
      console.log('false')
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <View style={styles.containercarregando}>
      {isLoading ? (
        // Inicio Container Geral

        <View style={styles.container}>
          {/** Inicio Container Header */}
          <Header name={user.name} />

          {/** Fim Container Header */}

          {bikes ? (
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
                            <AnimateNumber
                              value={statusbike.battery}
                              key={index}
                              style={styles.textbikeinfo}
                              formatter={(val) => {
                                return parseFloat(val).toFixed(0)
                              }}
                            />
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
                              {statusbike.velocity}
                            </Text>
                          ))}
                        </View>
                      ) : (
                        <ActivityIndicator size="large" color="#0D9488" />
                      )}

                      <Text style={{ fontSize: 23, left: 0, top: 3 }}>Km</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.containerPainel}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: 5,
                  }}
                >
                  Painel
                </Text>
                <View style={styles.containerPainelItens}>
                  <TouchableOpacity
                    style={styles.ItensPainel}
                    onPress={() => Light(IsLightColor)}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 17,
                        color: IsLightColor,
                      }}
                    >
                      Laterna
                    </Text>
                    <MaterialCommunityIcons
                      name="car-light-high"
                      size={60}
                      color={IsLightColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.ItensPainel}
                    onPress={() => Block(IsBlockColor)}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 17,
                        color: IsBlockColor,
                      }}
                    >
                      Bloqueio
                    </Text>
                    <Entypo name={IsBlockIcon} size={60} color={IsBlockColor} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.ItensPainel}
                    onPress={() => Ble(IsBleColor)}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 17,
                        color: IsBleColor,
                      }}
                    >
                      Bluetooth
                    </Text>
                    <Feather name="bluetooth" size={60} color={IsBleColor} />
                  </TouchableOpacity>
                </View>
              </View>
              <Odometro />
            </View>
          ) : (
            <View style={styles.containermiddle}>
              <UserBike />
            </View>
          )}
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
  containerodometro: {
    flexDirection: 'row', // Isso alinha os elementos horizontalmente
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '17%',
    top: 10,
    left: 8,
  },
  containerPainel: {
    flexDirection: 'column',
    width: '100%',
    height: '20%',
    top: '2%',
  },
  containerPainelItens: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containermodalbike: {
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  ItensPainel: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D9488',
    margin: 6,
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
