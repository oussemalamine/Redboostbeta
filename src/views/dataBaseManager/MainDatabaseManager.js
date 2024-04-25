import React from 'react'
import { CRow, CCol, CCard, CCardBody, CButton } from '@coreui/react'
import { DocsLink } from 'src/components'
import { ProgramCard } from '../../components/ProgramCard'
import { useDispatch, useSelector } from 'react-redux'

const MainDatabaseManager = () => {
  const dispatch = useDispatch()
  const programs = useSelector((state) => state.programsSlice.data)

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {programs.map((project, index) => (
              <CCol key={index} xs={12} sm={6} md={4} lg={3}>
                <ProgramCard
                  logo={project.logo}
                  title={project.title}
                  onView={() => console.log(`Viewing ${project.title}`)}
                />
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default MainDatabaseManager
