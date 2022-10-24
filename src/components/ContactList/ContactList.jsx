import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from 'redux/slices/contactsSlice';
import {getContacts, getFilter} from 'redux/selectors';
import { ContactItem } from '../ContactItem/ContactItem'
import css from './ContactList.module.css'

export const ContactList = () => {
    const contacts = useSelector(getContacts)
    const filter = useSelector(getFilter)
    const dispatch = useDispatch()

    const getFilterContacts = () => {
        if (!filter) {
            return contacts
        }
        const normalaizedFilter = filter.toLowerCase();

        return contacts.filter(({ name }) => {
            const normalaizedName = name.toLowerCase();
            const result = normalaizedName.includes(normalaizedFilter);
            return result;
    });
    }
    
     const onDeleteContact = (id) => {
    dispatch(deleteContact(id))
  }
        return (
    <ul className={css.list}>
        {contacts && getFilterContacts().map((contact) => 
        {
            return <ContactItem key={contact.id} id={contact.id} name={contact.name} number={contact.number} onDelete={onDeleteContact}/>
        }
        )}
    </ul>
)
    
}

