// Styles
import styles from './Register.module.css'

// React
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

// UserAuth
import { UserAuth } from '../../Context/AuthContext'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setComfirmPassword] = useState('')

  const navigate = useNavigate()

  const { createUser } = UserAuth()


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (password !== confirmPassword) {
        alert('Senhas inconpatíveis.')
        setPassword('')
        setComfirmPassword('')
        return
      }
      if (password.length < 6) {
        alert('Senha muito curta. Pelo menos 6 caracteres.')
        setPassword('')
        setComfirmPassword('')
        return
      }
      await createUser(email, password)
      navigate('/continuation')
    } catch (error) {
      console.log(error.message)
    }

    setEmail('')
    setPassword('')
    setComfirmPassword('')
  }


  return (
    <main className={styles.registerContainer}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Registrar-se</h2>
          <div className={styles.content}>
            <input onChange={(e) => setEmail(e.target.value)} maxLength='25' value={email} type="email" required />
            <label>Email</label>
          </div>
          <div className={styles.content}>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required />
            <label>Senha</label>
          </div>
          <div className={styles.content}>
            <input onChange={(e) => setComfirmPassword(e.target.value)} value={confirmPassword} type="password" required />
            <label>Confirmar senha</label>
          </div>
          <div className={styles.linkSignUp}>
            <p>Já tem uma conta?</p>
            <Link to='/login'>Clique aqui.</Link>
          </div>

          <button type='submit' className='btnSign'>Cadastrar</button>
        </form>
      </div>
    </main>
  )
}

export default Register