import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type propsNavigationStack = {
  Welcome: undefined
  SignIn: undefined
  NewUser: undefined
  Home: undefined
  Signup: undefined
  ConfirmUser: undefined
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>
