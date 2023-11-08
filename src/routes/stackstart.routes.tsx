import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from '../screen/Welcome'
import SignIn from '../screen/Signin'
import NewUser from '../screen/NewUser'
import * as SecureStore from 'expo-secure-store'
import { useState, useEffect } from 'react'
import Signup from '../screen/Signup'
import ConfirmUser from '../screen/ConfirmUser'
import Home from '../screen/Home'
import Profile from '../screen/Profile'
import Configuration from '../screen/Configuration'
const Stack = createNativeStackNavigator()

export default function StackRoutes() {
  const [isUserAuthenticated, SetisUserAuthenticated] = useState<
    null | boolean
  >(null)

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      SetisUserAuthenticated(!!token)
    })
  }, [])
  return (
    <Stack.Navigator screenOptions={{ title: '', headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ConfirmUser" component={ConfirmUser} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="NewUser" component={NewUser} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Configuration" component={Configuration} />
    </Stack.Navigator>
  )
}
