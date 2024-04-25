import React from 'react'
const PROGRAMS_KEY = '_0programs'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const MainDatabaseManager = React.lazy(() => import('./views/dataBaseManager/MainDatabaseManager'))
const ProgramMonitoring = React.lazy(() => import('./views/ProgramMonitoring/ProgramMonitoring'))
const Events = React.lazy(() => import('./components/Events/Events'))
const CreateEvents = React.lazy(() => import('./components/Events/CreateEvent'))
const User = React.lazy(() => import('./components/profile/UserProfile'))
const Activities = React.lazy(() => import('./components/Activities'))

const dynamicRoutes = localStorage.getItem(PROGRAMS_KEY)
  ? JSON.parse(localStorage.getItem(PROGRAMS_KEY)).map((element) => {
      return {
        path: `/Monitoring/${element.title}`,
        name: element.title,
        element: Activities,
      }
    })
  : []
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/Database', name: 'Database Manager', element: MainDatabaseManager },
  {
    path: '/Monitoring',
    name: 'Program Monitoring',
    element: ProgramMonitoring,
  },

  ...dynamicRoutes,
  { path: '/user', name: 'User', element: User },
  { path: '/events', name: 'All events', element: Events },
  { path: '/CreateEvent', name: 'Create Events', element: CreateEvents },
]

export default routes
