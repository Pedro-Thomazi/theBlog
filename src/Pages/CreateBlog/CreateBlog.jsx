import styles from './CreateBlog.module.css'

// UserAuth
import { UserAuth } from '../../Context/AuthContext'
import { db } from '../../Firebase/Firebase'

// React
// import { Link } from 'react-router-dom'

// Firebase
import { addDoc, collection } from 'firebase/firestore'

// React
import { useState } from 'react'

const CreateBlog = () => {
  const [title, setTitle] = useState('')
  const [textarea, setTextarea] = useState('')
  const { user } = UserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (title === '') {
      alert('Digite um título.')
      return
    }
    if (textarea === '') {
      alert('Digite o conteúdo.')
      return
    }

    try {
      await addDoc(collection(db, 'publications'), {
        title: title,
        text: textarea,
        date: new Date().toLocaleString(),
        userName: user.displayName ? user.displayName : user.email,
        commets: [],
        userId: user.uid
      })
      alert('Blog publicado com sucesso!!!')
    } catch (error) {
      console.log(error.message)
      alert('Ocorreu algum erro.')
    }

    setTitle('')
    setTextarea('')
  }

  return (
    <main className='container-fluid'>
      <section id={styles.containerCreate}>
        <div id={styles.pencilPhoto}>
          <div className={styles.text}>
            <h1>Hora de Criar</h1>
            <p>Em que você está pensando agora?</p>
          </div>
        </div>
        <div id={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.content}>
              <label>Título</label>
              <input onChange={(e) => setTitle(e.target.value)} value={title} maxLength='80' type="text" />
            </div>
            <div className={styles.content}>
              <label>Conteúdo</label>
              <textarea onChange={(e) => setTextarea(e.target.value)} maxLength='2000' value={textarea} cols="30" rows="10"></textarea>
            </div>
            <button id={styles.button} className='btn btnSign' type='submit'>Publicar</button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default CreateBlog