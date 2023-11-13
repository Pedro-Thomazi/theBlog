// Styles
import styles from './UpdateCard.module.css'

// React
import { useEffect, useState } from 'react'

// UserAuth
import { UserAuth } from '../../Context/AuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase'


const UpdateCard = ({id}) => {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const { updateUser } = UserAuth()

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      await updateDoc(doc(db, 'users', id), {
        gender: gender
      })
      await updateUser(name)
    } catch (error) {
      console.log(error.message)
    }
  }

  // useEffect(() => {
  //   const rail = document.querySelector('.rail')
  //   const body = document.querySelector('body')

  //   rail.addEventListener('onClick', () => {
  //     rail.classList.toggle('dark')
  //     body.classList.toggle('dark')
  //   })
  // } ,[])


  return (
    <div className={styles.container}>
      <header>
        <h2>Atualizar perfil</h2>

      </header>
      <form onSubmit={handleUpdate} className={styles.form}>
        <div className={styles.content}>
          <div className={styles.name}>
            <label>Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
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