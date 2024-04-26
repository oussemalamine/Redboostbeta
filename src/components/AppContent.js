import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { useSelector } from 'react-redux'
const Activities = React.lazy(() => import('../components/Activities'))

// routes config
import routes from '../routes'
const AppContent = () => {
  const dynamicRoutes = useSelector((state) => state.programsSlice.programs).map((program) => {
    return {
      path: `/Monitoring/${program.programTitle}`,
      name: program.programTitle,
      element: Activities,
    }
  })
  const allRoutes = [...routes, ...dynamicRoutes]
  console.log('allRoutes', allRoutes)
  return (
    <CContainer className="px-4">
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {allRoutes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
