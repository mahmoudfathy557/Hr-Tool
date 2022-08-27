import React, { Suspense, useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter,
} from 'react-router-dom'
import './App.css'
// import 'bootstrap/dist/css/bootstrap.css'

import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import ProtectedRoutes from './routes/ProtectedRoutes'
import SkeletonLoader from './components/Skeleton/SkeletonLoader'
import Login from './pages/Login/Login'

import { IntranetContext } from './context'
import MyNavbar from './components/Navbar'

export default function App() {
  const { user, serverError } = useContext(IntranetContext)

  const isAuthenticated = user.isAuthenticated
  return (
    <HashRouter basename='/'>
      <Suspense fallback={<SkeletonLoader />}>
        <Switch>
          <PublicRoute path='/login' isAuthenticated={isAuthenticated}>
            <Login />
          </PublicRoute>

          <>
            <PrivateRoute path='/' isAuthenticated={isAuthenticated}>
              <ProtectedRoutes />
            </PrivateRoute>
          </>
        </Switch>
      </Suspense>
    </HashRouter>
  )
}
