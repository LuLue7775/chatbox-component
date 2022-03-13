import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export default function Conversations() {
  const {conversations, selectConversationIndex} = useConversations();

  return (
    <ListGroup variant='flush'>
      {conversations.map((conversation, i ) => (
        <ListGroup.Item 
          key={i}
          action
          onClick={()=>selectConversationIndex(i)}
          active={conversation.selected}
        >
            {conversation?.recipients?.map(r => r.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
  
}
