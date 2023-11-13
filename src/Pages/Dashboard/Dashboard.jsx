import styles from './Dashboard.module.css'

// Foto user
import manUser from '../../Images/manUser.png'
import womanUser from '../../Images/womanUser.png'
import nullGender from '../../Images/foto-usuario.webp'

// Icons
import { BsList } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { ImExit } from 'react-icons/im'
import { useEffect, useState } from 'react'

import { UserAuth } from '../../Context/AuthContext'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase'
import PublicationCard from '../../Components/PublicationCard/PublicationCard'
import UpdateCard from '../../Components/UpdateCard/UpdateCard'

const Dashboard = () => {
  const [active, setActive] = useState('')
  const [activeUser, setActiveUser] = useState('')
  const [myPublicatins, setMyPublicatins] = useState([])
  const [userConfigs, setUserConfigs] = useState([])
  const { user, logout } = UserAuth()

  const openList = () => {
    if (active === '') {
      setActive(styles.active)
    }
    else {
      setActive('')
    }
  }

  const openUpdateCard = () => {
    if (activeUser === '') {
      setActiveUser(styles.activeUser)
    }
    else {
      setActiveUser('')
    }
  }

  const signout = async () => {
    try {
      await logout()
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    // User Firebase
    const qUser = query(collection(db, 'users'))
    const unsubscribeUser = onSnapshot(qUser, (queryUser) => {
      let userConfigs = []
      queryUser.forEach((doc) => {
        const data = doc.data()
        if (data.id && data.id === user.uid) {
          userConfigs.push({ ...data, id: doc.id })
        }
      })
      setUserConfigs(userConfigs)
    })


    // Publications Firebase
    const q = query(collection(db, 'publications'), orderBy('date', 'desc'))
    const unsubscribe = onSnapshot(q, (queryPubli) => {
      let publications = []
      queryPubli.forEach((doc) => {
        const data = doc.data()
        if (data.userId && data.userId === user.uid) {
          publications.push({ ...data, id: doc.id })
        }
      })
      setMyPublicatins(publications)
    })
    return () => {
      unsubscribeUser()
      unsubscribe()
    }
  }, [])


  return (
    <main className={styles.containerDashboard}>
      <header className='container-fluid'>
        {userConfigs[0]?.gender === '' ? (
          <div className={styles.user} id={styles.null}>
            <img src={nullGender} alt="Foto do usuário" />
            {user?.displayName ? (
              <h1>{user?.displayName}</h1>
            ) : (
              <h1>{user?.email}</h1>
            )}
          </div>
        ) : (
          userConfigs[0]?.gender === 'Male' ? (
            <div className={styles.user} id={styles.userMan}>
              <img src={manUser} alt="Foto do usuário" />
              {user?.displayName ? (
                <h1>{user?.displayName}</h1>
              ) : (
                <h1>{user?.email}</h1>
              )}
            </div>
          ) : (
            <div className={styles.user} id={styles.userWoman}>
              <img src={womanUser} alt="Foto da usuária" />
              {user?.displayName ? (
                <h1>{user?.displayName}</h1>
              ) : (
                <h1>{user?.email}</h1>
              )}
            </div>
          )
        )}
        <div className={styles.configsUser}>
          <BsList onClick={openList} className={styles.btnHamb} size={40} />
          <input className={styles.inputHidden} type="checkbox" name="btnHamb" id="btnHamb" />

          <div className={`${styles.userList} ${active}`} onClick={openList}>
            <div className={styles.list}>
              <button onClick={openList} className={styles.btnOptions} id={styles.btnClose}><AiOutlineClose /></button>
              <button onClick={openUpdateCard} className={styles.btnOptions}>Atualizar perfil</button>
              <button onClick={signout} className={styles.btnOptions} id={styles.exit} ><ImExit />Sair</button>
            </div>
          </div>

          <div className={styles.follow}>
            {/* <span>Seguindo 0</span>
            <span>Seguidores 0</span> */}
          </div>
        </div>
      </header>

      <div className={`${activeUser}`} id={styles.containerUpdate}>
        <div id={styles.updateCard}>
          <UpdateCard id={userConfigs[0]?.id} />
          <AiOutlineClose onClick={openUpdateCard} className={styles.buttonClose} size={35} color='#ee3214' />
        </div>
      </div>

      <section className={styles.content}>
        <h2>Minhas publicações</h2>
        {myPublicatins && myPublicatins.map((item, id) => (
          <PublicationCard item={item} key={id} />
        ))}
      </section>
    </main>
  )
}

export default Dashboard