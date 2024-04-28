import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import ExpiryModal from './ExpiryModal'
import { useDispatch } from 'react-redux'
import { setUserData } from '../app/features/userData/userData'
export const DefaultLayout = ({ setIsLogged }) => {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()
  const fetchUser = async (userEmail) => {
    try {
      const response = await axiosInstance.get(`/users?email=${userEmail}`)
      if (response.data) {
        const { password, confirmation, ...userDataWithoutPassword } = response.data
        dispatch(setUserData(userDataWithoutPassword))
      }
    } catch (error) {
      console.log('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axiosInstance.get('/login')
        const authenticated = response.data.authenticated
        if (!authenticated) {
          setModalOpen(true)
        } else {
          fetchUser(response.data.email)
        }
      } catch (error) {
        console.error('Error checking authentication status:', error)
      }
    }

    checkAuthStatus()

    const interval = setInterval(() => {
      checkAuthStatus()
    }, 30000)

    return () => clearInterval(interval)
  }, [navigate, setIsLogged])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader setIsLogged={setIsLogged} />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>

      {/* Bootstrap Modal for Session Expiry */}
      <ExpiryModal setIsLogged={setIsLogged} setModalOpen={setModalOpen} modalOpen={modalOpen} />
    </div>
  )
}
