import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import moment from 'moment'
import { Form, Row, Col, Container, Table } from 'react-bootstrap'
import { IntranetContext } from '../context'

const Home = () => {
  const { user, reduceVacationBalance, getUserVacations } =
    useContext(IntranetContext)

  const [state, setState] = useState({
    type: 'annual',
    startDate: '',
    endDate: '',
    days: '',
  })
  const [vacations, setVacations] = useState({ annual: 0, sick: 0 })

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const calcBusinessDays = (startDate, endDate) => {
    const day = moment(startDate)
    let businessDays = 0
    while (day.isSameOrBefore(endDate, 'day')) {
      // check if it is not friday nor saturday
      if (day.day() !== 5 && day.day() !== 6) {
        businessDays++
      }
      day.add(1, 'd')
    }

    setState({ ...state, days: businessDays })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = user.userData.id
    const type = state.type
    const days = state.days

    await reduceVacationBalance(id, type, days)
    await updateVacations()
  }

  // update days state if both start and end date are picked
  useEffect(() => {
    if (state.startDate && state.endDate) {
      calcBusinessDays(state.startDate, state.endDate)
    }
  }, [state.startDate, state.endDate])

  // update vacations on first render
  const updateVacations = async () => {
    const vacations = await getUserVacations()
    if (vacations) {
      setVacations(vacations)
    }
  }
  useEffect(() => {
    updateVacations()
  }, [])

  return (
    <div>
      <div className='container   '>
        {/* vacation type */}
        <div className='row box py-5'>
          <div className='section-header text-capitalize  '>
            select vacation type
          </div>
          <Container>
            <Row className='mx-auto'>
              <Col className='d-flex justify-content-center'>
                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='formPlaintextEmail'
                >
                  <Form.Label column sm='4'>
                    Type
                  </Form.Label>
                  <Col sm='8' className='d-flex align-items-center'>
                    <Form.Select
                      aria-label='Default select example'
                      style={{ width: '11rem' }}
                      value={state.type}
                      name='type'
                      onChange={handleChange}
                      required
                    >
                      <option value='annual'>annual</option>
                      <option value='sick'>sick</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </div>

        {/* create request type */}

        <div className='row box py-5'>
          <div className='section-header text-capitalize  '>
            create request details
          </div>

          <Container>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='formPlaintextEmail'
                  >
                    <Form.Label column sm='4'>
                      start date
                    </Form.Label>
                    <Col sm='8' className='d-flex align-items-center'>
                      <input
                        required
                        type='date'
                        name='startDate'
                        id='start-date'
                        value={state.startDate}
                        onChange={handleChange}
                        style={{ width: '11rem' }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='formPlaintextEmail'
                  >
                    <Form.Label column sm='4'>
                      end date
                    </Form.Label>
                    <Col sm='8' className='d-flex align-items-center'>
                      <input
                        required
                        type='date'
                        name='endDate'
                        id='end-date'
                        value={state.endDate}
                        onChange={handleChange}
                        style={{ width: '11rem' }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='formPlaintextEmail'
                  >
                    <Form.Label column sm='4'>
                      days
                    </Form.Label>
                    <Col sm='8' className='d-flex align-items-center'>
                      <input
                        type='text'
                        name='days'
                        id='days'
                        value={state.days}
                        onChange={handleChange}
                        readOnly
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>
                  <input
                    type='submit'
                    value='Submit'
                    className='bg-dark text-white border-dark rounded'
                  />
                </Col>
              </Row>
            </Form>
          </Container>
        </div>

        {/* vacation balance */}
        <div className='row box py-5'>
          <div className='section-header'>vacation balance</div>
          <Container>
            <Row>
              <Col sm='6'>
                <Form.Group
                  as={Row}
                  className='mb-3'
                  controlId='formPlaintextEmail'
                >
                  <Form.Label column sm='4'></Form.Label>
                  <Col>
                    <Table bordered hover>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Annual</td>
                          <td> {vacations.annual}</td>
                        </tr>
                        <tr>
                          <td>Sick</td>
                          <td> {vacations.sick}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default Home
