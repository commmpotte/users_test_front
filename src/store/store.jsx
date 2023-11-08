import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [userList, setUserList] = useState([])
  const [currentUser, setCurrentUser] = useState()

  const store = {
    userList,
    setUserList,
    currentUser,
    setCurrentUser,
  }

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>
}
