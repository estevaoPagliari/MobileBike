import Bike from './Bike'
import { api } from './api'
import * as SecureStore from 'expo-secure-store'
import jwtDecode from 'jwt-decode'

interface User {
  bike: Bike[]
  createdAt: string
  email: string
  id: string
  name: string
  password: string
  uploadedAt: string | null
}

interface DecodedToken {
  sub: string // Altere o tipo conforme a estrutura do seu token
}

export async function LoadUser() {
  try {
    const token = await SecureStore.getItemAsync('token')
    const decodedToken = jwtDecode<DecodedToken>(token)
    const userId = decodedToken.sub
    const response = await api.get<User>(`/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Erro na solicitação GET:', error)
  }
}

export default User
