import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import {addContact} from 'redux/contactsSlice';
import css from './ContactForm.module.css'

export const ContactForm = () => {    
  const dispatch = useDispatch()
  const contacts = useSelector(getContacts)
    const handleSubmitForm = (e) => {
    e.preventDefault()
      const { name, number } = e.target.elements
    let newContact = {
      name: name.value,
      number: number.value
      }
      isAddedContact (newContact);
    name.value = ''
    number.value = ''
  }

  const isAddedContact = (newContact) => {
     const {name}=newContact
     const addedName = contacts.find(
        contact =>
         contact.name.toLowerCase() === name.toLowerCase())
    if (addedName) {
      return alert(`${name} is already in contacts`)
    } else {
      dispatch(addContact(newContact))
    }
   
  }

    return (
        <form onSubmit={handleSubmitForm} className={css.form}>
            <label className={css.label}>Name</label>
            <input 
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Enter name"
            />
            <label>Phone number</label>
            <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="Enter phone number"
            />
            <button className={ css.button} type="submit"> Add contact</button>

        </form>
    )
    
}