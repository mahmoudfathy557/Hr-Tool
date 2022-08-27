import { lazy } from 'react'

const routes = [
  {
    path: '/',
    component: lazy((props) => import('../pages/Home')),
    exact: true,
  },
]

export default routes
