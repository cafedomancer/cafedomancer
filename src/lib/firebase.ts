import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAbjj6UmARYBISTZzKFQGaNJ3ixDw2xr1s',
  authDomain: 'cafedomancer-aa974.firebaseapp.com',
  projectId: 'cafedomancer-aa974',
  storageBucket: 'cafedomancer-aa974.appspot.com',
  messagingSenderId: '958857611584',
  appId: '1:958857611584:web:211dd930d2fb69339712a5',
  measurementId: 'G-2RPGRT6SC2',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
