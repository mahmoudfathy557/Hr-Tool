import React, { useContext } from 'react'

import logoutIcon from './img/logout icon.png'
import { IntranetContext } from '../context'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'

const MyNavbar = () => {
  const { user, logout } = useContext(IntranetContext)

  const userName = user?.userData?.name

  return (
    <Navbar bg='light' expand='md'>
      <Container fluid className='d-flex flex-column flex-md-row mx-3'>
        <Navbar.Brand>
          <Link className='nav-link' to='/'>
            HR Tool
          </Link>
        </Navbar.Brand>
        <h5 className='text-center d-md-none'>Welcome, {userName}</h5>

        <div className='   d-flex d-flex flex-column flex-md-row align-items-start align-items-md-end  my-3 m-md-0'>
          <h5 className='text-center d-none d-md-flex align-self-md-center'>
            Welcome, {userName}
          </h5>

          <div
            className='logout d-flex align-items-center ms-md-2'
            onClick={logout}
          >
            <img
              src={logoutIcon}
              alt='logout'
              height='40'
              width='40'
              className=' ms-2  '
            />
            <h5 className='nav-link'>logout</h5>
          </div>
        </div>
      </Container>
    </Navbar>
  )
}

export default MyNavbar
