// Styles
import styles from './Register.module.css'

// Firebase
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase'

// UserAuth
import { UserAuth } from '../../Context/AuthContext'

// React
import { useNavigate } from 'react-router-dom'


const Continuation = () => {
  const navigate = useNavigate()
  const { user } = UserAuth()

  const createUserInDb = async () => {
    await addDoc(collection(db, 'users'), {
      id: user.uid,
      email: user.email,
      name: '',
      perfilDescription: '',
      followers: 0,
      following: 0,
      gender: '',
      darkMode: false
    })

    navigate('/')
    window.location.reload()
  }


  return (
    <main className={styles.container}>
      <div className={styles.contentContin}>
        <h2>Parabêns!!!</h2>
        <h3>Você criou uma conta nova,</h3>
        <h3>vá para Home e faça suas publicações</h3>
        <button className='btnSign' onClick={createUserInDb}>Ir para Home</button>
      </div>
    </main>
  )
}

export default Continuation