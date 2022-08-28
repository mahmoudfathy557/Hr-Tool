import React, { useState, useContext } from 'react'
import './login.css'
import MVLogo from '../../components/img/schneider.png'
import { IntranetContext } from '../../context'

import SkeletonLoader from '../../components/Skeleton/SkeletonLoader'
import { Link } from 'react-router-dom'
const Register = () => {
  const { user, register } = useContext(IntranetContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { isLoading } = user

  const handleSubmit = async (e) => {
    e.preventDefault()
    await register(username, password)
  }

  return (
    <div className='login-page d-flex align-items-center'>
      <div className='container  '>
        <div className=' login-form '>
          <div className='col-9 col-md-7 col-lg-5 mt-5'>
            <div className='text-center mb-4'>
              <img className='mb-4' src={MVLogo} alt='logo' height={250} />
            </div>
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <form
                name='frmLogin'
                method='post'
                className='mt-5 d-flex flex-column'
                onSubmit={handleSubmit}
              >
                <div className='form-label-group'>
                  <input
                    type='text'
                    name='email'
                    className='form-control'
                    placeholder='User name'
                    required
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <br />
                <div className='form-label-group'>
                  <input
                    type='password'
                    name='password'
                    className='form-control'
                    placeholder='Password'
                    autoComplete='false'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <br />
                <button
                  className='btn btn-lg   login-btn btn-success   btn-block mb-4'
                  name='submit'
                  type='submit'
                >
                  Register
                </button>
                <p>
                  already't have an account?{' '}
                  <Link to='/login'>Sign in here</Link>
                </p>

                <p className='mt-5 mb-3 text-muted text-center'>
                  &copy; {new Date().getFullYear()}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
