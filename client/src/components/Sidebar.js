import React, {useState} from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Contacts from './Contacts'
import Conversations from './Conversations'
import ModalConversation from './ModalConversation'
import ModalContact from './ModalContact'

const CONVERSATION_KEY = 'conversation'
const CONTACTS_KEY = 'contacts'

export default function Sidebar({ id }) {

    const [activeKey, setActiveKey] = useState(CONVERSATION_KEY)

    const conversationsOpen = activeKey === CONVERSATION_KEY
    const [modalOpen, setModeOpen] = useState(false)

    const closeModal = ( ) => {
        setModeOpen(false)
    }

    return (
        <div style={{ width:'250px'}} className="d-flex flex-column"> 
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant='tabs' className='justify-content-center'>
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATION_KEY}> Conversation </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY}> Contacts </Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content
                    className='border overflow-auto flex-grow-1'
                >
                    <Tab.Pane eventKey={CONVERSATION_KEY}>
                        <Conversations/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY}>
                        <Contacts/>
                    </Tab.Pane>
                </Tab.Content>

                <div className='p-2 border small'> 
                    Your ID: <span className='text-muted'> {id} </span>
                </div>

                <Button className='rounded-0' onClick={()=>setModeOpen(true)}>
                    New {conversationsOpen? 'Conversation' : 'Contact'}
                </Button>

                <Modal show={modalOpen} onHide={closeModal}>
                    {conversationsOpen 
                    ? <ModalConversation closeModal={closeModal}/> 
                    : <ModalContact closeModal={closeModal}/>
                    }
                </Modal>
            </Tab.Container>
        </div>
    )
}
