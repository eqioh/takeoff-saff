import React from 'react';
import Button from '../../components/Button/Button';
import ContactList from '../../components/ContactList/ContactList';
import './ContactListPage.scss';

const ContactListPage = () => {
  const handleUserLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  return (
    <div className='contact-list-page'>
      <header className='contact-list-page__header contact-list-page-header'>
        <div className='contact-list-page-header-buttons-wrap'>
          <Button
            className='contact-list-page-header__button contact-list-page-header__button--logout'
            onClickHandler={handleUserLogout}
            text='Logout'
          />
        </div>
      </header>
      <div className='contact-list-wrap'>
        <ContactList />
      </div>
    </div>
  );
};

export default React.memo(ContactListPage);
