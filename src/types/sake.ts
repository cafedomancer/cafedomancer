import { Timestamp } from 'firebase/firestore'

export type Sake = {
  id: string
  brand: string
  title: string
  imageURL: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
