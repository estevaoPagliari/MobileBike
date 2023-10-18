import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Profile from '../screen/Profile'

const Stack = createNativeStackNavigator()

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ title: '', headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  )
}
