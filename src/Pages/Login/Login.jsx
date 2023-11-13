// Styles
import styles from './Login.module.css'

// React
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UserAuth } from '../../Context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {signIn} = UserAuth()
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await signIn(email, password)
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }

    setEmail('')
    setPassword('')
  }
  return (
    <main className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Login</h2>
          <div className={styles.content}>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required />
            <label>Email</label>
          </div>
          <div className={styles.content}>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required />
            <label>Senha</label>
          </div>
          <div className={styles.linkSignUp}>
            <p>Não tem uma conta ainda?</p>
            <Link to='/register'>Clique aqui.</Link>
          </div>

          <button type='submit' className='btnSign'>Entrar</button>
        </form>
      </div>
    </main>
  )
}

export default Login