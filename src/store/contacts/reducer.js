import { contactsActions } from './actionTypes';

const contacts = (state = [], { type, payload }) => {
  switch (type) {
    case contactsActions.SET_CONTACTS: {
      return payload;
    }
    case contactsActions.ADD_CONTACT: {
      return [...state, payload];
    }
    case contactsActions.EDIT_CONTACT: {
      return [
        ...state.map((contact) => {
          return contact.id !== payload.id ? contact : { ...payload };
        }),
      ];
    }
    case contactsActions.DELETE_CONTACT: {
      return [...state.filter((contact) => contact.id !== payload)];
    }
    default:
      return state;
  }
};

export { contacts };
