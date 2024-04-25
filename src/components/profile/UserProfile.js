import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CAlert,
  CSpinner,
} from '@coreui/react'
import UserProfileHeader from './UserProfileHeader'
import PersonalDetails from './PersonalDetails'
import axiosInstance from '../../axiosInstance'

const UserProfile = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  const email = 'oussema@gmail.com'

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users?email=${email}`)
        if (response.data) {
          setUserData(response.data)
          setLoading(false)
        }
      } catch (error) {
        console.log('Error in fetching Data:', error)
        setLoading(false)
      }
    }
    fetchUser()
  }, [email])

  return (
    <>
      {loading ? (
        <CSpinner color="primary" style={{ width: '3rem', height: '3rem' }} className="spinner" />
      ) : (
        <>
          <CRow>
            <CCol>
              <UserProfileHeader userData={userData} setUserData={setUserData} />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol xs={12} md={6} className="mb-3 mb-md-0">
              <PersonalDetails userData={userData} setUserData={setUserData} />
            </CCol>
            <CCol xs={12} md={6} className="mb-3 mb-md-0">
              <CCard>
                <CCardHeader className="bg-dark text-light">History</CCardHeader>
                <CCardBody style={{ maxHeight: '600px', overflow: 'auto' }}>
                  <CTable>
                    <CTableBody>
                      {userData.logs.map((log, index) => (
                        <CAlert key={index} color={getColorByIndex(index)}>
                          {log.date} :{' '}
                          {log.events.map((event, eventIndex) => (
                            <span style={{ backgroundColor: 'transparent' }} key={eventIndex}>
                              {event}
                            </span>
                          ))}
                        </CAlert>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      )}
    </>
  )
}

// Helper function to assign colors based on index
const getColorByIndex = (index) => {
  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

  // Use modulo to cycle through colors based on index
  return colors[index % colors.length]
}

export default UserProfile
