'use client'

import { db, storage } from '@/lib/firebase'
import { Sake } from '@/types/sake'
import { Timestamp, collection, doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import _ from 'lodash'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const router = useRouter()

  const [sake, setSake] = useState<Sake>({
    id: doc(collection(db, 'sakes')).id,
    brand: '',
    title: '',
    imageURL: '',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setDoc(doc(db, 'sakes', sake.id), _.omit(sake, 'id')).then(() => {
          router.push('/sakes')
        })
      }}
      className="flex flex-col gap-1 p-1"
    >
      <div>
        <label>Brand</label>
        <input
          type="text"
          onChange={(event) => {
            setSake((sake) => ({
              ...sake,
              brand: event.target.value,
            }))
          }}
          className="border"
        />
      </div>
      <div>
        <label>Title</label>
        <input
          type="text"
          onChange={(event) => {
            setSake((sake) => ({
              ...sake,
              title: event.target.value,
            }))
          }}
          className="border"
        />
      </div>
      <div>
        <label>Image</label>
        <input
          type="file"
          onChange={(event) => {
            const imageRef = ref(storage, `sakes/${sake.id}/image.webp`)
            uploadBytes(imageRef, event.target.files![0]).then(() => {
              getDownloadURL(imageRef).then((url) => {
                setSake((sake) => ({ ...sake, imageURL: url }))
              })
            })
          }}
        />
      </div>
      <div>
        <label>Created At</label>
        <input
          type="datetime-local"
          onChange={(event) => {
            setSake((sake) => ({
              ...sake,
              createdAt: Timestamp.fromDate(new Date(event.target.value)),
            }))
          }}
          className="border"
        />
      </div>
      <div>
        <label>Updated At</label>
        <input
          type="datetime-local"
          onChange={(event) => {
            setSake((sake) => ({
              ...sake,
              updatedAt: Timestamp.fromDate(new Date(event.target.value)),
            }))
          }}
          className="border"
        />
      </div>
      <div>
        <input type="submit" className="border" />
      </div>
    </form>
  )
}
