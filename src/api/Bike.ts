import jwtDecode from 'jwt-decode'
import DecodedToken from './DecodedToken'
import * as SecureStore from 'expo-secure-store'
import Status from './Status'
import { api } from './api'

interface Bike {
  createdAt: string
  id: string
  name: string
  status: Status[]
  uploadedAt: string | null
  userId: string
}

export async function loadBike() {
  try {
    const token = await SecureStore.getItemAsync('token')
    const decodedToken = jwtDecode<DecodedToken>(token)
    const userId = decodedToken.sub
    const response = await api.get<Bike>(`/bikesstatus/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    // console.log('RETURN BIKE', response.data[0])
    return response.data[0]
  } catch (error) {
    if (error === 500) {
      alert('Error em adcionar Bike, tente novamente')
    }
  }
}

export default Bike
