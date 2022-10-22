import { createReducer } from '@reduxjs/toolkit';
import { addContact, deleteContact, filterContact } from './actions';
import { LOCALSTORAGE_KEY } from 'constants/constants';

export const contactsReducer = createReducer(
  {
    contacts: JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY)) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  },
  {
    [addContact]: (state, action) => {
      const addedName = state.contacts.find(
        contact =>
          contact.name.toLowerCase() === action.payload.name.toLowerCase()
      );
      addedName
        ? alert(`${action.payload.name} is already in contacts`)
        : state.contacts.push(action.payload);
      window.localStorage.setItem(
        LOCALSTORAGE_KEY,
        JSON.stringify(state.contacts)
      );
    },
    [deleteContact]: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
      window.localStorage.setItem(
        LOCALSTORAGE_KEY,
        JSON.stringify(state.contacts)
      );
    },
    [filterContact]: (state, action) => {
      state.filter = action.payload.toLowerCase();
    },
  }
);
