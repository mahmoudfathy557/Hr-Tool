import React from 'react'
import { Spinner } from 'react-bootstrap'
import './skeleton.css'
import '../../pages/Login/login.css'
import dmgLogo from '../../components/img/dmg-logo.png'

const MyLoader = () => (
  <div className='row d-flex justify-content-center mt-5'>
    <Spinner animation='grow' variant='dark' />
    <Spinner animation='grow' variant='secondary' />
    <Spinner animation='grow' variant='dark' />
    <Spinner animation='grow' variant='secondary' />
  </div>
)

export default MyLoader
