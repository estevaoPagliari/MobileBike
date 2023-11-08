import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { propsStack } from '../../routes/model'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AnimateNumber from 'react-native-animate-number'
import Bike, { loadBike } from '../../api/Bike'

export default function Odometro() {
  const navegation = useNavigation<propsStack>()
  const [bikes, setBike] = useState<Bike | null>(null)
  async function LoadBikeData() {
    try {
      const bikeData = await loadBike()
      setBike(bikeData)
    } catch (error) {}
  }
  useEffect(() => {
    LoadBikeData()

    const intervalo = 60000
    let intervalId: NodeJS.Timeout | null = null
    if (bikes) {
      intervalId = setInterval(() => LoadBikeData(), intervalo)
    } else {
      console.log('false')
    }

    return () => {
      clearInterval(intervalId)
    }
  })

  return (
    <View style={styles.containerodometro}>
      <MaterialCommunityIcons name="bike-fast" size={75} color="#0D9488" />
      <View>
        {bikes ? (
          <View>
            {bikes.status.map((statusbike, index) => (
              <AnimateNumber
                value={statusbike.totalOdometer}
                key={index}
                style={{
                  fontSize: 60,
                  fontWeight: 'bold',
                  left: '5%',
                }}
                formatter={(val) => {
                  return parseFloat(val).toFixed(3)
                }}
              />
            ))}
          </View>
        ) : (
          <ActivityIndicator size="large" color="#0D9488" />
        )}
      </View>
      <Text
        style={{
          left: '10%',
          top: 12,
          fontSize: 30,
          alignItems: 'flex-end',
        }}
      >
        Km
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  containerodometro: {
    flexDirection: 'row', // Isso alinha os elementos horizontalmente
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '17%',
    top: 10,
    left: 8,
  },
})
