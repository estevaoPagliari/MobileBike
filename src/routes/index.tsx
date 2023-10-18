import { NavigationContainer } from '@react-navigation/native'

import StackStart from './stackstart.routes'
import { StatusBar } from 'expo-status-bar'

export default function Routes() {
  return (
    <NavigationContainer>
      <StatusBar translucent />
      <StackStart />
    </NavigationContainer>
  )
}
