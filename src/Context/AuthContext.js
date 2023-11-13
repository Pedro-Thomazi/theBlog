import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { auth } from '../Firebase/Firebase'

const UserContext = createContext()

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState({})

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const updateUser = (name) => {
    return updateProfile(user, {
      displayName: name
    })
  }

  useEffect(() => {
    const unsubscreibe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser)
      setUser(currentUser)
    })

    return () => {
      unsubscreibe()
    }
  }, [])

  return (
    <UserContext.Provider value={{createUser, user, signIn, logout, updateUser}}>
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext)
}