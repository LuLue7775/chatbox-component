import React, {useCallback, useState} from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';

export default function OpenConversation() {
  const { sendMessage, selectedConversation } = useConversations();
  const [ text, setText ] = useState('');

  const setRef = useCallback( node => {
      node?.scrollIntoView({ smooth:true })
  },[])

  const handleSubmit = e => {
    e.preventDefault()
    sendMessage(  selectedConversation.recipients.map( r => r.id ) , text )
    setText('')
  }

  return (
    <div className='d-flex flex-column flex-grow-1'>
        <div className='flex-grow-1 overflow-auto'>
            <div className='d-flex flex-column align-items-start justify-conect-end px-3'>
                {selectedConversation?.messages?.map((message, i) => {
                    const lastMsg = selectedConversation.messages.length -1 === i;

                    return(
                        <div key={i} ref={lastMsg ? setRef : null}
                            className={`my-1 d-flex flex-column ${message?.isFromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}> 
                            <div className={`rounded px-2 py-1 ${message?.isFromMe ? 'bg-primary text-white' : 'border'}`}>
                                {message.text}
                            </div>
                            <div className={`text-muted small ${message?.isFromMe && 'text-end'}`}>{message?.isFromMe ? 'You' : message.senderName }</div>
                        </div>
                    )
                })}
            </div>
        </div>

        <Form onSubmit={handleSubmit}>
            <Form.Group className='m-2'>
                <InputGroup>
                    <Form.Control
                      as="textarea"
                      required
                      value={text}
                      onChange={e => setText(e.target.value)}
                      style={{ height:'75px', resize:'none'}}
                    />

                        <Button type="submit"> Send</Button>
                </InputGroup>
            </Form.Group>
        </Form>
    </div>
  )
}
