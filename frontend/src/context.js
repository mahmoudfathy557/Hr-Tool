import React, { useState, useEffect } from 'react'
import axios from 'axios'

const IntranetContext = React.createContext()

const IntranetProvider = ({ children }) => {
  //Check if token existed

  const [serverError, setServerError] = useState({ show: false, msg: '' })
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [user, setUser] = useState(
    localStorage.getItem('hr-tool')
      ? {
          isLoading: false,
          isAuthenticated: true,
          error: null,
          userData: JSON.parse(localStorage.getItem('hr-tool')),
        }
      : {
          isLoading: false,
          isAuthenticated: false,
          error: null,
          userData: null,
        }
  )

  const baseAPI = 'http://localhost:5000/api/v1'

  const login = async (username, password) => {
    setUser({
      ...user,
      isLoading: true,
    })
    try {
      const { data } = await axios.post(`${baseAPI}/auth/login`, {
        username,
        password,
      })

      const localUserData = { name: data.user.name, id: data.user.id }
      localStorage.setItem('hr-tool', JSON.stringify(localUserData))
      setUser({
        isLoading: false,
        isAuthenticated: true,
        error: null,
        userData: data?.user,
      })
    } catch (error) {
      setUser({
        isLoading: false,
        isAuthenticated: false,
        error: error?.response?.data?.msg,
        userData: null,
      })
      return error
    }
  }

  const logout = () => {
    localStorage.removeItem('hr-tool')
    window.location.href = '/'
  }

  const getUserVacations = async () => {
    try {
      const { data } = await axios.get(
        `${baseAPI}/vacation/getUserVacations/${user.userData.id}`
      )
      return data.vacations
    } catch (error) {
      console.log(error)
    }
  }

  const reduceVacationBalance = async (id, type, days) => {
    try {
      const { data } = await axios.patch(
        `${baseAPI}/vacation/reduceVacationBalance/${id}`,
        {
          type,
          days,
        }
      )

      console.log(data)
    } catch (error) {
      console.log(error)
      alert(error.response.data.error)
    }
  }

  return (
    <IntranetContext.Provider
      value={{
        user,
        isDataLoading,
        serverError,
        login,
        logout,
        reduceVacationBalance,
        getUserVacations,
      }}
    >
      {children}
    </IntranetContext.Provider>
  )
}

export { IntranetContext, IntranetProvider }
