import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import Input from '../Input/Input';
import ContactListItem from './ContactListItem/ContactListItem';
import ModalAddEditContact from '../ModalAddEditContact/ModalAddEditContact';
import { getContactsAsync } from '../../api/contacts/contacts-service';
import './ContactList.scss';

const ContactList = (props) => {
  const [search, setSearch] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();

  const contacts = useSelector(({ contacts }) => contacts);

  useEffect(() => {
    dispatch(getContactsAsync());
  }, [dispatch]);

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);
  const handleSearch = (e) => setSearch(e.target.value);

  const filteredContacts = contacts
    ? contacts.filter(
        (item) =>
          item.fullName.toLowerCase().includes(search.toLowerCase()) ||
          item.company.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const modalAddContact = (
    <ModalAddEditContact
      handleCloseModal={handleCloseModal}
      isOpen={modalIsOpen}
      mode='add'
    ></ModalAddEditContact>
  );

  const emptySearch =
    !filteredContacts.length && contacts.length ? (
      <div className='contact-list__message'>Nothing found</div>
    ) : null;

  const loadingMessage = !contacts.length ? (
    <div className='contact-list__message'>Loading...</div>
  ) : null;

  return (
    <div className='contact-list'>
      <div className='contact-list__search contact-list-search'>
        <Input
          id='search'
          className='contact-list-search__input'
          onChangeHandler={handleSearch}
          placeholderText='Type something to search'
        />
      </div>
      <div className='contact-list__header contact-list-header'>
        <div className='contact-list-header__item contact-list-header__item--name'>Fullname</div>
        <div className='contact-list-header__item contact-list-header__item--company'>Company</div>
        <div className='contact-list-header__item contact-list-header__item--phone'>Phone</div>
        <div className='contact-list-header__item contact-list-header__item--actions'></div>
      </div>
      {filteredContacts.map(({ id, fullName, company, phoneNumber }) => {
        return (
          <ContactListItem
            id={id}
            key={id}
            fullName={fullName}
            company={company}
            phoneNumber={phoneNumber}
          />
        );
      })}
      {emptySearch}
      {loadingMessage}
      <Button
        className='contact-list__button contact-list__button--add'
        onClickHandler={handleOpenModal}
        text='Add'
      />
      {modalIsOpen ? modalAddContact : null}
    </div>
  );
};

export default React.memo(ContactList);
