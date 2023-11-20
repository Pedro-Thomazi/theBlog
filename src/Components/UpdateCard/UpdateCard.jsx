// Styles
import styles from './UpdateCard.module.css'

// React
import { useEffect, useState } from 'react'

// UserAuth
import { UserAuth } from '../../Context/AuthContext'
import { collection, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase'


const UpdateCard = ({id}) => {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [maritalStatus, setMaritalStatus] = useState('')
  // const [userConfigs, setUserConfigs] = useState([])
  const { user, updateUser } = UserAuth()

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      await updateDoc(doc(db, 'users', id), {
        gender: gender,
        maritalStatus: maritalStatus
      })
      await updateUser(name)
    } catch (error) {
      console.log(error.message)
    }
  }

  // useEffect(() => {
  //   // User Firebase
  //   const qUser = query(collection(db, 'users'))
  //   const unsubscribeUser = onSnapshot(qUser, (queryUser) => {
  //     let userConfigs = []
  //     queryUser.forEach((doc) => {
  //       const data = doc.data()
  //       if (data.id && data.id === user.uid) {
  //         userConfigs.push({ ...data, id: doc.id })
  //       }
  //     })
  //     setUserConfigs(userConfigs)
  //   })
  //   return () => unsubscribeUser()
  // }, [])

  return (
    <div className={styles.container}>
      <header>
        <h2>Atualizar perfil</h2>

      </header>
      <form onSubmit={handleUpdate} className={styles.form}>
        <div className={styles.content}>
          <div className={styles.name}>
            <label>Nome</label>
            <input type="text" value={name} placeholder={user.displayName} onChange={(e) => setName(e.target.value)} />
          </div>
          <fieldset>
            <legend>Sexo</legend>
            <input onChange={(e) => setGender(e.target.value)}
              value='Male'
              type="radio"
              name="sexo"
              id="man" /> <label htmlFor="man">Masculino</label>

            <input onChange={(e) => setGender(e.target.value)}
              value='Female'
              className={styles.woman}
              type="radio"
              name="sexo"
              id="woman" /> <label htmlFor="woman">Feminino</label>
          </fieldset>
          <fieldset>
            <legend>Estado civil</legend>
            <input onChange={(e) => setMaritalStatus(e.target.value)}
              value='Casado'
              type="radio"
              name="maritalStatus"
              id="married" /> <label htmlFor="married">Casado</label>

            <input onChange={(e) => setMaritalStatus(e.target.value)}
              value='Solteiro'
              className={styles.woman}
              type="radio"
              name="maritalStatus"
              id="single" /> <label htmlFor="single">Solteiro</label>
            <input onChange={(e) => setMaritalStatus(e.target.value)}
              value='Viúvo'
              className={styles.woman}
              type="radio"
              name="maritalStatus"
              id="widower" /> <label htmlFor="widower">Viúvo</label>
          </fieldset>
          {/* <div>
            <label>darkMode</label>
            <input type="checkbox" name="darkMode" id="darkMode" />
            <div className={styles.rail}>
              <label htmlFor="darkMode" className={styles.indicator}></label>
            </div>
          </div> */}
        </div>

        <button type='submit' className='btn btnSign'>Atualizar</button>
      </form>
    </div>
  )
}

export default UpdateCard