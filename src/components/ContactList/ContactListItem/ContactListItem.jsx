import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../../CustomButton/CustomButton';
import ModalAddEditContact from '../../ModalAddEditContact/ModalAddEditContact';
import { deleteContactAsync } from '../../../api/contacts/contacts-service';
import './ContactListItem.scss';

const ContactListItem = (props) => {
  const { id, fullName, company, phoneNumber } = props;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleDeleteContact = () => {
    dispatch(deleteContactAsync(id));
  };

  const modalEditContact = (
    <ModalAddEditContact
      contactId={id}
      fullName={fullName}
      company={company}
      phoneNumber={phoneNumber}
      handleCloseModal={handleCloseModal}
      isOpen={modalIsOpen}
      mode='edit'
    ></ModalAddEditContact>
  );

  return (
    <div className='contact-list-item'>
      <div className='contact-list-item-name-wrap'>
        <span className='contact-list-item__name truncate'>{fullName}</span>
      </div>
      <div className='contact-list-item-company-wrap'>
        <span className='contact-list-item__company truncate'>{company}</span>
      </div>
      <div className='contact-list-item__phone contact-list-item-phone'>
        <a href={`tel:${phoneNumber}`} className='contact-list-item-phone__link'>
          {phoneNumber}
        </a>
      </div>
      <div className='contact-list-item-buttons'>
        <CustomButton
          className='contact-list-item__button contact-list-item__button--edit'
          icon={<FontAwesomeIcon icon={faEdit} />}
          onClickHandler={handleOpenModal}
        />
        <CustomButton
          className='contact-list-item__button contact-list-item__button--delete'
          icon={<FontAwesomeIcon icon={faTrash} />}
          onClickHandler={handleDeleteContact}
        />
      </div>
      {modalIsOpen ? modalEditContact : null}
    </div>
  );
};

export default React.memo(ContactListItem);
