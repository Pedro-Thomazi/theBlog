import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

// UserAuth
import { UserAuth } from '../../Context/AuthContext'

const Navbar = () => {

  const { user } = UserAuth()

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {!user ? (
          <li>
          <Link to='/login'>Login</Link>
        </li>
        ) : (
          <li>
            <Link to='/dashboard'>Meu Perfil</Link>
          </li>
        )}
        <li>
          <Link to='/create-publi'>Criar</Link>
        </li>
        <li>
          <Link to='/about'>Sobre</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar