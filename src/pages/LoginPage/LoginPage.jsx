import React, { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { userLogin } from '../../api/users/users-service';
import './LoginPage.scss';

const LoginPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [incorrectInput, setIncorrectInput] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      window.location.href = '/contacts';
    }
  }, []);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setIncorrectInput(false);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIncorrectInput(false);
  };

  const handleSubmitLogin = () => {
    userLogin(username, password).then((result) => {
      if (result) {
        localStorage.setItem('currentUser', username);
        window.location.href = '/contacts';
      } else {
        setIncorrectInput(true);
      }
    });
  };

  const incorrectInputMessage = incorrectInput ? (
    <div className='login-page-message__incorrect-input '>Failed to login, try again</div>
  ) : null;

  return (
    <div className='login-page'>
      <div className='login-page__form login-page-form'>
        <label
          className='login-page-form__item login-page-form__label login-page-form__label--username'
          htmlFor='username'
        >
          Username
        </label>
        <Input
          className='login-page-form__item login-page-form__input login-page-form__input--username'
          id='username'
          onChangeHandler={handleUserNameChange}
          value={username}
        ></Input>
        <label
          className='login-page-form__item login-page-form__label login-page-form__label--password'
          htmlFor='password'
        >
          Password
        </label>
        <Input
          className='login-page-form__item login-page-form__input login-page-form__input--password'
          id='password'
          onChangeHandler={handlePasswordChange}
          type='password'
          value={password}
        ></Input>
        <div className='login-page__message login-page-message'>{incorrectInputMessage}</div>
        <Button
          className='login-page-form__submit'
          onClickHandler={handleSubmitLogin}
          text='Log in'
        ></Button>
      </div>
    </div>
  );
};

export default React.memo(LoginPage);
