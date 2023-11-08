import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import HeaderConfig from './components/HeaderConfig'
import User, { LoadUser } from '../api/User'

export default function Configuration() {
  const [user, setUser] = useState<User | null>(null)

  async function LoadUserData() {
    try {
      const userData = await LoadUser()
      setUser(userData)
    } catch (error) {}
  }

  useEffect(() => {
    LoadUserData()
  })
  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.container}>
          <HeaderConfig name={user.name} />
          <View style={styles.containermiddle}>
            <Text style={styles.title}>Configuração</Text>
          </View>
        </View>
      ) : (
        <View style={styles.ActivityIndicator}>
          <ActivityIndicator size="large" color="#000" />
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  ActivityIndicator: {
    flex: 1,
    justifyContent: 'center',
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
})
