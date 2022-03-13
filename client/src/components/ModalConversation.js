import React, { useRef, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'


export default function ModalConversation({closeModal}) {
  const { contacts } = useContacts();
  const { createConversations } = useConversations();
  const [selectedContactsIds, setSelectedContactsIds] = useState([]);

  const handleCheckboxChange = (contactId) => {
    setSelectedContactsIds(prevSelectedContactIds => {
      if(prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter(prevId => { 
          return contactId !== prevId
        })
      } else {
        return [...prevSelectedContactIds, contactId]
      }

    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    createConversations(selectedContactsIds)
    closeModal()
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {contacts.map(contact => (
              <Form.Group controlId={contact.id} key={contact.id} >
                <Form.Check
                  type="checkbox"
                  label={contact.name}
                  value={selectedContactsIds.includes(contact.id)}
                  onChange={() => handleCheckboxChange(contact.id)}
                />
              </Form.Group>
            ))}
            <Button type="submit" className='mt-4'>Create</Button>
          </Form>
      </Modal.Body>
    </>
    )
}
