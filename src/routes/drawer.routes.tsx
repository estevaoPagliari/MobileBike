import { createDrawerNavigator } from '@react-navigation/drawer'
import { Feather } from '@expo/vector-icons'

import StackRoutes from './stack.routes'
import Home from '../screen/Home'
import Feed from '../screen/Feed'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator screenOptions={{ title: 'TESTE' }}>
      <Drawer.Screen
        name="Home"
        component={Feed}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          drawerLabel: 'Início',
        }}
      />
      <Drawer.Screen
        name="profile"
        component={StackRoutes}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          drawerLabel: 'Perfil',
        }}
      />
    </Drawer.Navigator>
  )
}
