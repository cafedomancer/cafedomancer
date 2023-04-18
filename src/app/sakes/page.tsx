import { db } from '@/lib/firebase'
import { Sake } from '@/types/sake'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import Image from 'next/image'

export const revalidate = 0

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
    <div className="grid grid-cols-3">
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

          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 pl-1 leading-none text-white">
            <span className="pr-1 text-[0.675rem] ">{sake.brand}</span>
            <br />
            <span className="text-[0.5rem]">{sake.title || '(未設定)'}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
