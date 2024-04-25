import React, { useState, useEffect } from 'react'
import { ProgramCard } from '../../components/'
import { addProgram } from '../../app/features/programs/programsSlice'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CListGroup,
  CListGroupItem,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
const users = [
  { id: 1, name: 'oussema' },
  { id: 2, name: 'fares' },
  { id: 3, name: 'mojadi' },
]
import { useDispatch, useSelector } from 'react-redux'
export default function ProgramMonitoring() {
  const dispatch = useDispatch()
  const programs = useSelector((state) => state.programsSlice.data)
  const [logo, setLogo] = useState()
  const [programName, setProgramName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [budget, setBudget] = useState('')
  const [visible, setVisible] = useState(false)
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      // When the reader finishes loading the file, set the image state to the result
      setLogo(reader.result)
    }

    if (file) {
      // Read the file as a data URL
      reader.readAsDataURL(file)
    }
  }
  return (
    <>
      <CModal
        fullscreen-md-down
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="FullscreenExample1"
      >
        <CModalHeader>
          <CModalTitle id="FullscreenExample1">Add Program</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CCol>
                <CFormLabel htmlFor="logo">Logo</CFormLabel>
                <CFormInput
                  type="file"
                  id="logo"
                  placeholder="Enter logo"
                  onChange={handleImageChange}
                />
              </CCol>
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon2">@</CInputGroupText>
              <CFormInput
                id="program name"
                placeholder="Program Name"
                aria-label="Program Name"
                aria-describedby="basic-addon2"
                onChange={(e) => setProgramName(e.target.value)}
              />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CCol>
                <CFormLabel htmlFor="start date">start Date</CFormLabel>
                <CFormInput
                  type="date"
                  id="start date"
                  placeholder="Enter start date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </CCol>
              <CCol>
                <CFormLabel htmlFor="end date">end Date</CFormLabel>
                <CFormInput
                  type="date"
                  id="end date"
                  placeholder="Enter end date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </CCol>
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>$</CInputGroupText>
              <CFormInput
                type="number"
                id="budget"
                placeholder="Enter budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              <CInputGroupText>.00</CInputGroupText>
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CFormSelect aria-label="The Program Lead">
                <option>Choose The Program Lead</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </CFormSelect>
            </CInputGroup>
            <CRow xs={{ cols: 'auto' }}>
              <CCol xs className="m-auto">
                <CButton
                  color="primary"
                  onClick={() => {
                    dispatch(
                      addProgram({
                        id: programs.length,
                        title: programName,
                        start_date: startDate,
                        end_date: endDate,
                        budget: budget,
                        logo: logo,
                      }),
                    )
                    setVisible(false)
                  }}
                >
                  Add Program
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
      </CModal>

      <div className="text-end">
        <CButton className=" mb-3" color="primary" onClick={() => setVisible(!visible)}>
          Add Program
        </CButton>
      </div>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {programs.map((program, index) => (
              <CCol key={index} xs={12} sm={6} md={4} lg={3}>
                <ProgramCard
                  logo={program.logo}
                  title={program.title}
                  path={`${window.location.pathname}/${program.title}`}
                />
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}
