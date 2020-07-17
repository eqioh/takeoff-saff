import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import uniqId from 'uniqid';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';
import { addContactAsync, editContactAsync } from '../../api/contacts/contacts-service';
import './ModalAddEditContact.scss';

const ModalAddEditContact = (props) => {
  const { contactId, mode, isOpen, handleCloseModal } = props;

  const regexPhoneNumber = /^\+(\d){1}-(\d){3}-(\d){3}-(\d){4}$/gi;
  const regexFullName = /^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/gi;

  const dispatch = useDispatch();

  const [fullName, setFullName] = useState(props.fullName ? props.fullName : '');
  const [company, setCompany] = useState(props.company ? props.company : '');
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber ? props.phoneNumber : '');
  const [incorrectFullNameInput, setIncorrectFullNameInput] = useState(false);
  const [incorrectPhoneNumberInput, setIncorrectPhoneNumberInput] = useState(false);

  const handleCompanyChange = (e) => setCompany(e.target.value);

  const handleFullNameChange = (e) => {
    setIncorrectFullNameInput(false);
    setFullName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setIncorrectPhoneNumberInput(false);
    setPhoneNumber(e.target.value);
  };

  const handleAddContact = () => {
    if (
      fullName &&
      company &&
      phoneNumber &&
      regexFullName.test(fullName) &&
      regexPhoneNumber.test(phoneNumber)
    ) {
      dispatch(addContactAsync({ id: uniqId(), fullName, company, phoneNumber }));
      handleCloseModal();
    } else if (!regexPhoneNumber.test(phoneNumber)) {
      setIncorrectPhoneNumberInput(true);
    } else if (!regexFullName.test(fullName)) {
      setIncorrectFullNameInput(true);
    }
  };

  const handleEditContact = () => {
    if (
      fullName &&
      company &&
      phoneNumber &&
      regexFullName.test(fullName) &&
      regexPhoneNumber.test(phoneNumber)
    ) {
      dispatch(editContactAsync({ id: contactId, fullName, company, phoneNumber }));
      handleCloseModal();
    } else if (!regexPhoneNumber.test(phoneNumber)) {
      setIncorrectPhoneNumberInput(true);
    } else if (!regexFullName.test(fullName)) {
      setIncorrectFullNameInput(true);
    }
  };

  const incorrectFullNameInputClassName = incorrectFullNameInput ? 'incorrect-input' : '';
  const incorrectPhoneNumberInputClassName = incorrectPhoneNumberInput ? 'incorrect-input' : '';

  return (
    <>
      {isOpen && (
        <Modal>
          <div className='modal-add-edit-contact-wrap'>
            <div className='modal-add-edit-contact'>
              <label
                className='modal-add-edit-contact__item modal-add-edit-contact__label modal-add-edit-contact__label--name'
                htmlFor='contact-name'
              >
                Full Name
              </label>
              <Input
                id='contact-name'
                key={'234243'}
                className={`modal-add-edit-contact__item modal-add-edit-contact__input modal-add-edit-contact__input--name ${incorrectFullNameInputClassName}`}
                onChangeHandler={handleFullNameChange}
                type='text'
                value={fullName}
              />
              <label
                className='modal-add-edit-contact__item modal-add-edit-contact__label modal-add-edit-contact__label--company'
                htmlFor='contact-company'
              >
                Company
              </label>
              <Input
                id='contact-company'
                className='modal-add-edit-contact__item modal-add-edit-contact__input modal-add-edit-contact__input--company'
                onChangeHandler={handleCompanyChange}
                type='text'
                value={company}
              />
              <label
                className='modal-add-edit-contact__item modal-add-edit-contact__label modal-add-edit-contact__label--phone'
                htmlFor='contact-phone'
              >
                Phone Number (+X-XXX-XXX-XXXX)
              </label>
              <Input
                id='contact-phone'
                className={`modal-add-edit-contact__item modal-add-edit-contact__input modal-add-edit-contact__input--phone ${incorrectPhoneNumberInputClassName}`}
                onChangeHandler={handlePhoneNumberChange}
                type='text'
                value={phoneNumber}
              />
              <div className='modal-add-edit-contact__item modal-add-edit-contact__buttons'>
                <Button
                  className='modal-add-edit-contact__button modal-add-edit-contact__button--cancel'
                  onClickHandler={handleCloseModal}
                  text='Cancel'
                />
                <Button
                  className='modal-add-edit-contact__button modal-add-edit-contact__button--accept'
                  onClickHandler={mode === 'add' ? handleAddContact : handleEditContact}
                  text={mode === 'add' ? 'Add' : 'Edit'}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default React.memo(ModalAddEditContact);
