import styles from './UserPage.module.css'

// Foto user
import manUser from '../../Images/manUser.png'
import womanUser from '../../Images/womanUser.png'
import nullGender from '../../Images/foto-usuario.webp'


// React
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Firebase
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase'

// Components
import PublicationCard from '../../Components/PublicationCard/PublicationCard'

const UserPage = () => {
  const [userPublicatins, setUserPublicatins] = useState([])
  const [seguidores, setSeguidoderes] = useState(0)
  const [user, setUser] = useState([])

  const { id } = useParams()
  // console.log(id)

  useEffect(() => {
    // Dados do user
    const qUser = query(collection(db, 'users'))
    const unsubscribeUser = onSnapshot(qUser, (queryUser) => {
      let userConfigs = []
      queryUser.forEach((doc) => {
        const data = doc.data()
        if (data.id && data.id === id) {
          userConfigs.push({ ...data, id: doc.id })
        }
      })
      setUser(userConfigs)
    })

    // Postagens do user
    const q = query(collection(db, 'publications'), orderBy('date', 'desc'))
    const unsubscribe = onSnapshot(q, (queryPubli) => {
      let publications = []
      queryPubli.forEach((doc) => {
        const data = doc.data()
        if (data.userId && data.userId === id) {
          publications.push({ ...data, id: doc.id })
        }
      })
      setUserPublicatins(publications)
    })
    return () => {
      unsubscribeUser()
      unsubscribe()
    }
  }, [])

  const handleFollowers = () => {
    setSeguidoderes(seguidores + 1)
  }

  const handleUnFollowers = () => {
    setSeguidoderes(seguidores - 1)
  }

  return (
    <main className={styles.containerDashboard}>
      <header className='container-fluid'>
        {user && user.map((item, id) => (
          <div key={id}>
            {item.gender === '' ? (
              <div className={styles.user} id={styles.null}>
              <img src={nullGender} alt="Foto do usuário" />
              {item.displayName ? (
                <h1>{item.displayName}</h1>
              ) : (
                <h1>{item.email}</h1>
              )}
            </div>
            ) : (
              item.gender === 'Male' ? (
                <div className={styles.user} id={styles.userMan}>
                  <img src={manUser} alt="Foto do usuário" />
                  {item.displayName ? (
                    <h1>{item.displayName}</h1>
                  ) : (
                    <h1>{item.email}</h1>
                  )}
                </div>
              ) : (
                <div className={styles.user} id={styles.userWoman}>
                  <img src={womanUser} alt="Foto da usuária" />
                  {item.displayName ? (
                    <h1>{item.displayName}</h1>
                  ) : (
                    <h1>{item.email}</h1>
                  )}
                </div>
              )
            )}

            <div className={styles.configsUser} >
              <div className={styles.follow}>
                <span>Seguindo {item.following}</span>
                <span>Seguidores {seguidores}
                  {/* {item.followers} */}
                </span>
              </div>

              <input type="checkbox" className={styles.inputHide} name="inputBtn" id="inputBtn" />
              {/* <div className={styles.buttons}>
                <label htmlFor='inputBtn' onClick={handleFollowers} className={styles.btnFollow}>Seguir</label>
                <label htmlFor='inputBtn' onClick={handleUnFollowers} className={styles.btnUnfollow}>Deixar de Seguir</label>
              </div> */}
            </div>
          </div>
        ))}
      </header >

      <section className={styles.content}>
        <h2>Publicações</h2>
        {userPublicatins && userPublicatins.map((item, id) => (
          <PublicationCard item={item} key={id} />
        ))}
      </section>
    </main >
  )
}

export default UserPage