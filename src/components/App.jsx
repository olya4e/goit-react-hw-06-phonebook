import { ContactForm } from './ContactForm/ContactForm '
import { ContactList } from "./ContactList/ContactList"
import { Filter } from "./Filter/Filter";
import css from './ContactForm/ContactForm.module.css'

export const App = () => {
 
  return (
      <div className={css.container}>
  <h1>Phonebook</h1>
        <ContactForm/>
        <h2>Contacts</h2>
        <Filter />
        <ContactList /> 
      </div> 
    )
}
