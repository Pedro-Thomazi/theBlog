import styles from './PublicationCard.module.css'

// React
import { useState } from 'react'

// Icons
import { FaRegComment } from 'react-icons/fa'
import { BsFillTrashFill } from 'react-icons/bs'

import { UserAuth } from '../../Context/AuthContext'

// Images
import userNotPhoto from '../../Images/foto-usuario.webp'
import { Link } from 'react-router-dom'
import { arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../Firebase/Firebase'


const PublicationCard = ({ item }) => {
  const [show, setShow] = useState('')
  const [textComment, setTextComment] = useState('')

  const { user } = UserAuth()

  const handleAddComment = async (e) => {
    e.preventDefault()

    if (textComment === '') return

    try {
      const commentDocRef = doc(db, 'publications', item.id)
      const newCommentData = {
        name: user?.displayName,
        email: user?.email,
        comment: textComment,
        date: new Date().toLocaleString(),
        idUserComment: user?.uid
      }
      await updateDoc(commentDocRef, {
        commets: arrayUnion(newCommentData)
      })
      setTextComment('')
    } catch (error) {
      console.log(error.message)
    }

    console.log('Comentado', textComment)
  }

  const showComments = () => {
    if (show === '') {
      setShow(styles.active)
    }
    else {
      setShow('')
    }
  }

  const deletePubli = async (id) => {
    await deleteDoc(doc(db, 'publications', id))
  }

  const deleteComment = async (id) => {

  }

  return (
    <div className={styles.publication}>
      <div className={styles.pricipal}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.text}>{item.text}</p>
        <div className={styles.qtdComments}>
          <div>
            <FaRegComment onClick={showComments} size={25} />
            <p>{item.commets.length}</p>
          </div>
          {user?.uid === item.userId && (
            <div>
              <BsFillTrashFill onClick={() => deletePubli(item.id)} id={styles.trash} size={25} />
              {/* <BsFillPencilFill id={styles.pencil} size={25} /> */}
            </div>
          )}
        </div>
        <div className={styles.configs}>
          {item.userName === user?.email ? (
            <Link to='/dashboard'>Autor: <span className={styles.name}>{item.userName}</span></Link>
          ) : (
            <Link to={`/user/${item.userId}`}>Autor: <span className={styles.name}>{item.userName}</span></Link>
          )}
          <span className={styles.date}>{item.date}</span>
        </div>
      </div>
      <div className={`${styles.comments} ${show}`}>
        <div className={styles.addComment}>
          <form onSubmit={handleAddComment} className={styles.formComment}>
            <textarea onChange={(e) => setTextComment(e.target.value)} maxLength='2000' value={textComment} cols="30" rows="10"></textarea>
            {user && user ? (
              <button type='submit' className={styles.btnComment}>Comentar</button>
            ) : (
              <Link to='/login' className={styles.btnComment}>Faça seu login</Link>
            )}
          </form>
        </div>
        {item.commets.map((itemComment, id) => (
          <div key={id} className={styles.comment}>
            <div className={styles.userComment}>
              <img src={userNotPhoto} alt="Foto do usuário" />
              {itemComment.name && itemComment.name ? (
                itemComment.name === user?.displayName ? (
                  <Link to='/dashboard' className={styles.nameComment}>{itemComment.name}</Link>

                ) : (
                  <Link to={`/user/${itemComment.idUserComment}`} className={styles.nameComment}>{itemComment.name}</Link>
                )
              ) : (
                itemComment.email === user?.email ? (
                  <Link to='/dashboard' className={styles.nameComment}>{itemComment.email}</Link>
                ) : (
                  <Link to={`/user/${itemComment.idUserComment}`} className={styles.nameComment}>{itemComment.email}</Link>
                )
              )}
            </div>
            <p className={styles.textComment}>{itemComment.comment}</p>
            <footer>
              {itemComment.idUserComment === user?.uid && (
                <BsFillTrashFill onClick={() => deleteComment(itemComment.id)} size={25} color='#ee1221' />
              )}
              <span className={styles.dateComment}>{itemComment.date}</span>
            </footer>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PublicationCard