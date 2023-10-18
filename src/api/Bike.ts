import Status from './Status'

interface Bike {
  createdAt: string
  id: string
  name: string
  status: Status[]
  uploadedAt: string | null
  userId: string
}

export default Bike
