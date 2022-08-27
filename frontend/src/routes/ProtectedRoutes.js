import { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './routes' // Route list
import SkeletonLoader from '../components/Skeleton/SkeletonLoader'
import Navbar from '../components/Navbar'
import NoFoundComponent from '../pages/NoFoundComponent'

const ProtectedRoutes = () => (
  <Switch>
    <Suspense fallback={<SkeletonLoader />}>
      <div className='app-content'>
        <Navbar />
        {routes.map(({ component, path, exact }) => {
          return (
            <Route
              path={`/${path}`}
              key={path}
              exact={exact}
              component={component}
            />
          )
        })}
      </div>
    </Suspense>
  </Switch>
)

export default ProtectedRoutes
