import React, { useCallback, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)  // this is the Context.Consumer
}

export function ConversationsProvider({children, id}) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0); 

  const { contacts } = useContacts();
  const socket  = useSocket();

  function createConversations(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, messages:[] }]
    })
  }
  
  /**
   * recipient is just id, need name of recipient, so get it from contact(another context)
   * packing conversation, new recipient and selectedIndex
   */
  const formattedConversations = conversations?.map( (conversation, i) => {
    const recipients = conversation?.recipients?.map( recipient => {
        const contact = contacts.find(contact => {
          return contact.id === recipient
        })
        const name = contact?.name || recipient
        return {id: recipient, name}
    })

    const messages = conversation?.messages?.map(message => {
        const contact = contacts.find(contact => {
          return contact.id === message.sender
        })
        const name = contact?.name || message.sender
        const isFromMe = id === message.sender
        return { ...message, senderName: name, isFromMe }
    })

    const selected = i === selectedConversationIndex
    return { ...conversation, recipients, selected, messages }
  })

  /**
   * this function will be also used on server 
   * handle either create a new conversation or update prev conversation
   *  @conversation = { recipients:[recipientIds], messages: [text , senderId] }
   */

  const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
    setConversations( prevConversations => {
      let madeChange = false;
      const newMessage = { sender, text };
      const newConversations = prevConversations?.map(conversation => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true
          return {
              ...conversation,
              messages: [...conversation?.messages, newMessage]
            }
          }
        return conversation
      })

      if(madeChange) {
        return newConversations
      } else {
        return [ ...prevConversations, { recipients, messages: [newMessage] } ]
      }

    })
  }, [setConversations])

  const sendMessage = ( recipients, text ) => {
    socket.emit('send-message', { recipients, text })
    addMessageToConversation({recipients, text, sender:id })
    
  }

  useEffect(()=>{
    if(!socket) return
    
    socket.on('receive-message', addMessageToConversation)
    return ()=>socket.off('receive-message')
  }, [socket, addMessageToConversation])

  return (
    <ConversationsContext.Provider 
      value={{ 
          conversations:formattedConversations, 
          selectConversationIndex:setSelectedConversationIndex,
          selectedConversation:formattedConversations[selectedConversationIndex],
          createConversations, 
          sendMessage
         }}>

      {children}
    </ConversationsContext.Provider>
    )
}


function arrayEquality(a, b) {
  if (a.length !== b.length) return false
  
  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}