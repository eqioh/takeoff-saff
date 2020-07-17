import { apiRoute } from '../helpers/constants';
import {
  setContacts,
  addContact,
  editContact,
  deleteContact,
} from '../../store/contacts/actionCreators';

const getContactsAsync = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${apiRoute}/contacts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const contacts = await response.json();
      await dispatch(setContacts(contacts));
    } catch (error) {
      console.log(error);
    }
  };
};

const addContactAsync = ({ id, fullName, company, phoneNumber }) => {
  return async (dispatch) => {
    try {
      await fetch(`${apiRoute}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, fullName, company, phoneNumber }),
      });
      await dispatch(addContact({ id, fullName, company, phoneNumber }));
    } catch (error) {
      console.log(error);
    }
  };
};

const editContactAsync = ({ id, fullName, company, phoneNumber }) => {
  return async (dispatch) => {
    try {
      await fetch(`${apiRoute}/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, company, phoneNumber }),
      });
      await dispatch(editContact({ id, fullName, company, phoneNumber }));
    } catch (error) {
      console.log(error);
    }
  };
};

const deleteContactAsync = (contactId) => {
  return async (dispatch) => {
    try {
      await fetch(`${apiRoute}/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await dispatch(deleteContact(contactId));
    } catch (error) {
      console.log(error);
    }
  };
};

export { getContactsAsync, addContactAsync, editContactAsync, deleteContactAsync };
