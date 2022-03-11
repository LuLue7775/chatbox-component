import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

export default function ModalConversation({closeModal}) {

  const idRef = useRef()
  const nameRef = useRef()

  const handleSubmit = e => {
    e.preventDefault()

    // createConversation(idRef.current.value, name.current.value)
    closeModal()
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control type='text' ref={idRef} required/>
            </Form.Group>  
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' ref={nameRef} required/>
            </Form.Group>  

            <Button type="submit" className='mt-4'>Create</Button>
          </Form>
      </Modal.Body>
    </>
    )
}
