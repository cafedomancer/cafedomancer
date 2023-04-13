import { db } from '@/lib/firebase'
import { Sake } from '@/types/sake'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import Image from 'next/image'

async function getSakes(): Promise<Sake[]> {
  const querySnapshot = await getDocs(
    query(collection(db, 'sakes'), orderBy('createdAt', 'desc'))
  )

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    brand: doc.data().brand,
    title: doc.data().title,
    imageURL: doc.data().imageURL,
    createdAt: doc.data().createdAt,
    updatedAt: doc.data().updatedAt,
  }))
}

export default async function Page() {
  const sakes = await getSakes()

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {sakes.map((sake) => (
        <div className="relative" key={sake.id}>
          <div>
            <Image
              src={sake.imageURL}
              alt={sake.brand}
              width={250}
              height={250}
            />
          </div>

          <div className="absolute bottom-0 left-0 w-full bg-black pl-1 bg-opacity-40">
            <span className="text-sm pr-1">{sake.brand}</span>
            <span className="text-xs">{sake.title}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
