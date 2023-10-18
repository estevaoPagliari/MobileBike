import Bike from './Bike'

interface User {
  bike: Bike[]
  createdAt: string
  email: string
  id: string
  name: string
  password: string
  uploadedAt: string | null
}

export default User
