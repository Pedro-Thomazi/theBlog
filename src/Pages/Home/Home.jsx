import styles from './Home.module.css'

// Components
import BgImage from '../../Components/BgImage/BgImage'

// Firebase
import { db } from '../../Firebase/Firebase'

// React
import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

import PublicationCard from '../../Components/PublicationCard/PublicationCard'


const Home = () => {
  const [allPublications, setAllPublications] = useState([])

  useEffect(() => {
    const publiRef = collection(db, "publications");
    const q = query(publiRef, orderBy('date', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnap) => {
      let publicationsArr = []

      querySnap.forEach((doc) => {
        publicationsArr.push({ ...doc.data(), id: doc.id })
      })
      setAllPublications(publicationsArr)
    })
    return () => unsubscribe()
  }, [])


  return (
    <main className={styles.homeContainer}>
      <BgImage />
      <section className={styles.publications}>
        {allPublications.map((item, id) => (
          <PublicationCard item={item} key={id} />
        ))}
      </section>
    </main>
  )
}

export default Home