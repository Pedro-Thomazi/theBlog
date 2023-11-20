import styles from './Header.module.css'

// Logo
import logo from '../../Images/logo.png'

// Components
import Navbar from '../Navbar/Navbar'

// Icons
import { BsFacebook, BsYoutube, BsTwitter, BsLinkedin } from 'react-icons/bs'

// Router
import { Link } from 'react-router-dom'

// UserAuth
import { UserAuth } from '../../Context/AuthContext'


const Header = () => {
  const { user } = UserAuth()

  const url = window.location.pathname

  if (url !== '/continuation') {
    return (
      <header className="container-fluid" id={styles.headerContainer}>
        <div className={styles.container}>
          <Link to='/' className={styles.logo}>
            <img src={logo} alt="Logo The Blog" />
          </Link>

          <div className={styles.navbarContainer}>
            <Navbar />
          </div>

          <div className={styles.socials}>
            {user && (
              user?.displayName ? (
                <p className={styles.name}>Olá, <span>{user.displayName}</span></p>
              ) : (
                <p className={styles.name}>Olá, <span>{user.email}</span></p>
              )
            )}
            {!user && (
              <>
                <Link to='/'>
                  <BsFacebook size={25} />
                </Link>
                <Link to='/'>
                  <BsYoutube size={25} />
                </Link>
                <Link to='/'>
                  <BsTwitter size={25} />
                </Link>
                <Link to='/'>
                  <BsLinkedin size={25} />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    )
  }
}

export default Header