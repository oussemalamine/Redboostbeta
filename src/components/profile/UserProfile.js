import React, { useState, useEffect } from 'react'
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
  CContainer,
} from '@coreui/react'
import UserProfileHeader from './UserProfileHeader'
import PersonalDetails from './PersonalDetails'
import { useSelector } from 'react-redux'

const UserProfile = () => {
  const userData = useSelector((state) => state.userData.userData)
  console.log('userData :', userData)
  const [user, setUser] = useState(null)
  useEffect(() => {
    setUser(userData)
  }, [userData])
  if (!user) {
    return (
      <CContainer style={{ padding: '20px' }} className="mt-4">
        <CRow>
          <CCol xs="auto">
            <CSpinner color="primary" />
          </CCol>
        </CRow>
      </CContainer>
    )
  }
  return (
    <>
      <CRow>
        <CCol>
          <UserProfileHeader user={user} setUser={setUser} />
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol xs={12} md={6} className="mb-3 mb-md-0">
          <PersonalDetails user={user} setUser={setUser} />
        </CCol>
        <CCol xs={12} md={6} className="mb-3 mb-md-0">
          <CCard>
            <CCardHeader className="bg-dark text-light">History</CCardHeader>
            <CCardBody style={{ maxHeight: '600px', overflow: 'auto' }}>
              <CTable>
                <CTableBody>
                  {user && user.logs && user.logs.length > 0 ? (
                    // Render logs only if user and user.logs are not undefined
                    user.logs.map((log, index) => (
                      <CAlert key={index} color={getColorByIndex(index)}>
                        {log.date} :{' '}
                        {log.events.map((event, eventIndex) => (
                          <span style={{ backgroundColor: 'transparent' }} key={eventIndex}>
                            {event}
                          </span>
                        ))}
                      </CAlert>
                    ))
                  ) : (
                    <CAlert color="warning">No logs found.</CAlert>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
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
