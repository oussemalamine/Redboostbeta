import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CForm,
  CInputGroup,
  CFormInput,
  CContainer,
  CRow,
  CCol,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilContact,
  cilSpreadsheet,
  cilCode,
  cilInstitution,
  cilBirthdayCake,
  cilLockLocked,
  cilCloudUpload,
  cibGmail,
  cilPhone,
  cibOrcid,
} from '@coreui/icons'
import axiosInstance from '../../axiosInstance'

const PersonalDetails = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [updateLog, setUpdateLog] = useState([])
  const [editedData, setEditedData] = useState([])

  useEffect(() => {
    const updateUserLogs = async () => {
      try {
        const updatedLogs = [
          ...user.logs, // Existing logs
          ...updateLog, // New logs to append
        ]

        const response = await axiosInstance.put(`/users/${user._id}`, {
          logs: updatedLogs,
        })

        if (response.data) {
          console.log('Logs Updated')
          setUser((prevUser) => ({
            ...prevUser,
            logs: updatedLogs,
          }))
          setUpdateLog([])
        } else {
          console.log('Error in updating Logs')
        }
      } catch (error) {
        console.error('Error updating Logs:', error)
      }
    }
    if (updateLog.length > 0) {
      updateUserLogs()
    }
  }, [updateLog, user])

  // Function to handle edit mode toggle
  const toggleEditMode = () => {
    setIsEditing(!isEditing)
  }
  const handleConfirm = async () => {
    try {
      const updatedData = {}
      editedData.forEach((field) => {
        updatedData[field] = user[field]
      })
      if (updateLog.length > 0) {
        updatedData.logs = [...user.logs, ...updateLog]
      }
      const response = await axiosInstance.put(`/users/${user._id}`, updatedData)
      if (response.status === 200) {
        console.log('User updated successfully:', response.data)
        if (editedData.length > 0) {
          // Check if editedData is not empty
          editedData.forEach((element) => {
            const currentDate = new Date().toLocaleDateString()
            setUpdateLog((prevUpdateLog) => {
              const updatedLogs = [...prevUpdateLog]
              const existingLogIndex = updatedLogs.findIndex((log) => log.date === currentDate)
              if (existingLogIndex !== -1) {
                updatedLogs[existingLogIndex].events.push(
                  `User update ${element} at ${new Date().toLocaleTimeString()}`,
                )
              } else {
                updatedLogs.push({
                  date: currentDate,
                  events: [`User update ${element} at ${new Date().toLocaleTimeString()}`],
                })
              }
              return updatedLogs
            })
          })
        }
        setEditedData(null)
      } else {
        console.error('Failed to update user:', response.statusText)
      }
    } catch (error) {
      console.error('Error updating user:', error.message)
    }
    setIsEditing(false)
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
    setEditedData((prev) => {
      if (prev === null) return [name]
      const index = prev.indexOf(name)
      if (index !== -1) {
        // If name exists, update it
        const updatedData = [...prev]
        updatedData[index] = name
        return updatedData
      } else {
        // If name doesn't exist, add it
        return [...prev, name]
      }
    })
  }

  // Render the personal details in edit mode
  const renderEditableDetails = () => {
    return (
      <CForm>
        {personalDetails.map((detail, index) => (
          <CInputGroup key={index} className="mb-3">
            <label htmlFor={`input-${index}`} className="form-label">
              <CIcon icon={detail.icon} /> {detail.label}:
            </label>
            <CFormInput
              type="text"
              id={`input-${index}`}
              name={detail.name}
              value={detail.value}
              onChange={handleChange}
            />
          </CInputGroup>
        ))}
        <div className="d-flex justify-content-center mt-3">
          <CButton style={{ marginRight: '15px' }} color="primary" onClick={handleConfirm}>
            Save Changes
          </CButton>
          <CButton color="info" onClick={toggleEditMode}>
            Cancel
          </CButton>
        </div>
      </CForm>
    )
  }

  // Mock data until you fix data from the database
  const personalDetails = [
    { name: 'cin', icon: cibOrcid, label: 'N°CIN', value: user.cin },
    { name: 'email', icon: cibGmail, label: 'Email', value: user.email },
    { name: 'phone', icon: cilPhone, label: 'Phone', value: user.phone },
    { name: 'adress', icon: cilContact, label: 'Address', value: user.adress },
    {
      name: 'matricule',
      icon: cilSpreadsheet,
      label: 'Matricule fiscale',
      value: user.matricule,
    },
    { name: 'role', icon: cilCode, label: 'Role', value: user.role },
    { name: 'department', icon: cilInstitution, label: 'Department', value: user.department },
    { name: 'birthday', icon: cilBirthdayCake, label: 'Birthday', value: user.birthday },
    { name: 'password', icon: cilLockLocked, label: 'Password', value: '************' },
    // Add more rows as needed
  ]

  return (
    <CCard>
      <CCardHeader className="bg-dark text-light">Personal Details</CCardHeader>
      <CCardBody>
        {!isEditing ? (
          <CTable responsive="sm">
            <CTableBody>
              {personalDetails.map((detail, index) => (
                <CTableRow key={index}>
                  <CTableHeaderCell>
                    <CIcon icon={detail.icon} /> {detail.label}:
                  </CTableHeaderCell>
                  <CTableDataCell>{detail.value}</CTableDataCell>
                </CTableRow>
              ))}
              <CTableRow>
                <CTableHeaderCell>
                  <CIcon icon={cilCloudUpload} />
                  Upload CV:
                </CTableHeaderCell>
                <CTableDataCell>
                  <CFormInput type="file" id="formFile" />
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        ) : (
          renderEditableDetails()
        )}
        <div className="d-flex justify-content-center mt-3">
          {!isEditing && (
            <CButton color="info" onClick={toggleEditMode}>
              Edit
            </CButton>
          )}
        </div>
      </CCardBody>
    </CCard>
  )
}

export default PersonalDetails