import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const Activities = React.lazy(() => import('../components/Activities'))
const AppBreadcrumb = () => {
  const dynamicRoutes = useSelector((state) => state.programsSlice.programs).map((program) => {
    return {
      path: `/Monitoring/${program.programTitle}`,
      name: program.programTitle,
      element: Activities,
    }
  })
  const allRoutes = [...routes, ...dynamicRoutes]
  console.log('App Content All routes', allRoutes)
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, allRoutes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation.replace('/Dash', ''))
  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
