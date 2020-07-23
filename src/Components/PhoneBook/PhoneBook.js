import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import SearchBar from '../SearchBar/SearchBar'
import ContactsContainer from '../ContactsContainer/ContactsContainer'
import CreateContact from '../CreateContact/CreateContact'

function PhoneBook() {
  const [contacts, setContacts] = useState([{
    // contato já imbutido na inicialização
    id: 1,
    firstName: 'Matheus Souza',
    lastName: 'Santana',
    phone: 98912123456,
    email: 'matheus@gmail.com',
    address: 'algum lugar',
    birthday: '01/01/1111',
    details: ''
  }


  ])


  const [search, setSearch] = useState('')

  const filteredContactsHandler = (e) => {
    setSearch(e.target.value)
  }

  const removeHandler = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  const createContactHandler = (newContact) => {
    if (newContact.firstName) {
      setContacts([...contacts, newContact])
    }
  } 

  const editContactHandler = (event, prevContact) => {
    const copyContacts = [...contacts]
    const { target: { name, value } } = event
    const editedContact = { ...prevContact, [name]: value }
    const nextContact = copyContacts.find(contact => contact.id === prevContact.id)
    Object.keys(nextContact).forEach(contactKey => nextContact[`${contactKey}`] = editedContact[`${contactKey}`])

    setContacts(copyContacts)
  }

  let filteredContacts = contacts.filter(contact => contact.firstName.toLowerCase().includes(search.toLowerCase()) || contact.phone.toString().includes(search))
  return (
    <Container fluid={"md"} className="my-4">
      <SearchBar filter={filteredContactsHandler} />
      <CreateContact add={createContactHandler} />
      <ContactsContainer contacts={filteredContacts} remove={removeHandler} editContactHandler={editContactHandler} />
    </Container>
  )
}

export default PhoneBook;