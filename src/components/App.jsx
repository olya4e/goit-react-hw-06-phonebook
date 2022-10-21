import { useState } from "react"
import { nanoid } from "nanoid";
import { ContactForm } from './ContactForm/ContactForm '
import { ContactList } from "./ContactList/ContactList"
import { Filter } from "./Filter/Filter";
import { LOCALSTORAGE_KEY } from "../constants/constants";
import {useLocalStorage} from '../hooks/useLocalStorage';
import css from './ContactForm/ContactForm.module.css'

export const App = () => {
  const [contacts, setContacts] = useLocalStorage(LOCALSTORAGE_KEY, [])
  const [filter, setFilter] = useState('')
  
  const handleSubmitForm = (e) => {
    e.preventDefault()
    const { name, number } = e.target.elements
    addContact(name.value, number.value)
    name.value = ''
    number.value = ''
  }

  const addContact = (name, number) => {
    let isAdded = false 
    let newContact = {
      id: nanoid(),
      name,
      number,
    }
      contacts.map(contact =>{
      if (contact.name.toLowerCase() === name.toLowerCase()) {
        isAdded = true
        alert(`${name} is already in contacts`)
      }
      return null
      })
    switch (isAdded) {
      case true:
        break
      case false:
        setContacts(prev => [...prev, newContact])
        break
      default:
        throw new Error('invalid data')
    }   
  }
  
  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
    
  }

  const onFilterContact = () => {
    if (contacts) {
      return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
    }
  }

  const onDeleteContact = (deelteContact) => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== deelteContact)
      )
  }
  
  return (
      <div className={css.container}>
  <h1>Phonebook</h1>
        <ContactForm onSubmit={handleSubmitForm}/>
        <h2>Contacts</h2>
        <Filter value={filter} handleChangeFilter={handleChangeFilter} />
        <ContactList contacts={onFilterContact()} onDeleteContact={onDeleteContact} /> 
      </div> 
    )
}
