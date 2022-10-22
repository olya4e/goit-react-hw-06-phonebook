import { useDispatch, useSelector } from "react-redux";
import { addContact, deleteContact } from 'redux/actions';
import { nanoid } from "nanoid";
import { ContactForm } from './ContactForm/ContactForm '
import { ContactList } from "./ContactList/ContactList"
import { Filter } from "./Filter/Filter";
import css from './ContactForm/ContactForm.module.css'

export const App = () => {
  const contacts = useSelector(state => state.contactsReducer.contacts.filter(contact=>contact.name.toLowerCase().includes(state.contactsReducer.filter)))
  const dispatch = useDispatch()
  
  const handleSubmitForm = (e) => {
    e.preventDefault()
    const { name, number } = e.target.elements
    let newContact = {
      id: nanoid(),
      name: name.value,
      number: number.value
    }
    console.log(dispatch(addContact(newContact)));
    name.value = ''
    number.value = ''
  }


  const onDeleteContact = (id) => {
    dispatch(deleteContact(id))
  }
  
  return (
      <div className={css.container}>
  <h1>Phonebook</h1>
        <ContactForm onSubmit={handleSubmitForm}/>
        <h2>Contacts</h2>
        <Filter />
        <ContactList contacts={contacts} onDeleteContact={onDeleteContact} /> 
      </div> 
    )
}
