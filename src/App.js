import React, { Suspense, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import axiosInstance from './axiosInstance'
import ResetPassword from './components/ResetPassword'
// import ProtectedRoute from './ProtectedRoute'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const [userEmail, setUserEmail] = useState('')
  const [userData, setUserData] = useState('')
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [isLogged, setIsLogged] = useState(false)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const checkAuth = async () => {
      await axiosInstance.get('/login').then((response) => {
        if (response.data.authenticated) {
          setIsLogged(true)
          setUserEmail(response.data.email)
        } else {
          setIsLogged(false)
          setUserEmail('')
        }
        setLoading(false)
        console.log('checkAuth:', response.data)
      })
    }
    checkAuth()
  }, [])
  useEffect(() => {
    const fetchUser = async () => {
      if (userEmail) {
        try {
          const response = await axiosInstance.get(`/users?email=${userEmail}`)
          if (response.data) {
            console.log(response.data)
            setUserData(response.data)
            setLoading(false) // Update loading state when done
          }
        } catch (error) {
          console.log('Error fetching user data:', error)
          setLoading(false) // Handle loading state in case of errors
        }
      }
    }
    fetchUser()
  }, [userEmail])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/events')
        if (response.data) {
          console.log(response.data)
          setEvents(response.data)
        }
      } catch (error) {
        console.log('Failed to fetch events ;', error)
      }
    }
    fetchData()
  }, [])
  console.log(isLogged)

  if (loading ) {
    return (
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      ></Suspense>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="pt-3 text-center">
          <CSpinner color="primary" variant="grow" />
        </div>
      }
    >
      <Routes>
        <Route
          exact
          path="/"
          name="Login Page"
          element={<Login setIsLogged={setIsLogged} isLogged={isLogged} />}
        />
        <Route exact path="/register" name="Register Page" element={<Register />} />
        <Route exact path="/*" name="Page 404" element={<Page404 />} />
        <Route exact path="/500" name="Page 500" element={<Page500 />} />
        <Route exact path="/password-reset" name=" Account Recovery" element={<ResetPassword />} />
        <Route
          path="/Dash/*"
          element={
            isLogged ? (
              <DefaultLayout setIsLogged={setIsLogged} userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Suspense>
  )
}

export default App
