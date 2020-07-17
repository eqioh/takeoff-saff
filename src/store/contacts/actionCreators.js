import { contactsActions } from './actionTypes.js';

const setContacts = (contacts) => ({
  type: contactsActions.SET_CONTACTS,
  payload: contacts,
});
const addContact = (contact) => ({
  type: contactsActions.ADD_CONTACT,
  payload: contact,
});
const editContact = (contact) => ({
  type: contactsActions.EDIT_CONTACT,
  payload: contact,
});
const deleteContact = (id) => ({
  type: contactsActions.DELETE_CONTACT,
  payload: id,
});

export { setContacts, addContact, editContact, deleteContact };
