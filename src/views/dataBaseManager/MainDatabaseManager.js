import React from 'react'
import { CRow, CCol, CCard, CCardBody, CButton } from '@coreui/react'
import { DocsLink } from 'src/components'

const ProjectCard = ({ logo, title, onView }) => {
  return (
    <CCard className="mb-4">
      <CCardBody className="d-flex flex-column">
        <div className="d-flex justify-content-center align-items-center mb-5" style={{ height: '125px' }}>
          <img src={logo} alt="Project Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
        <h5 className="text-center">{title}</h5>
        <div className="mt-auto d-grid">
          <CButton color="primary" onClick={onView}>View</CButton>
        </div>
      </CCardBody>
    </CCard>
  )
}

const MainDatabaseManager = () => {
  const projects = [
    { logo: 'https://redstart.tn/wp-content/uploads/2023/01/Fichier-1@4x-1024x680.png', title: 'Women Go Green' },
    { logo: 'https://redstart.tn/wp-content/uploads/2023/05/creactlogo-v2-1024x266.png', title: 'CREACT4MED' },
    // Add more projects as needed
  ]

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {projects.map((project, index) => (
              <CCol key={index} xs={12} sm={6} md={4} lg={3}>
                <ProjectCard
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
