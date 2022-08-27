import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function MyModal({
  modalShow,
  setModalShow,
  deletedSurveyIndex,
  deleteOneSurvey,
}) {
  return (
    <Modal
      show={modalShow}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Deleting Survey !!!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p> Are you sure you want to delete this survey ?? </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='danger'
          onClick={() => {
            if (deletedSurveyIndex) {
              deleteOneSurvey(deletedSurveyIndex)
            }
            setModalShow(false)
          }}
        >
          Yes !!
        </Button>
        <Button onClick={() => setModalShow(false)}>No</Button>
      </Modal.Footer>
    </Modal>
  )
}
