import React from 'react';

const Input = (props) => {
  const { className, id, onChangeHandler, placeholderText, type, value } = props;

  return (
    <input
      className={className}
      id={id}
      onChange={onChangeHandler}
      placeholder={placeholderText}
      type={`${type}` || 'text'}
      value={value}
    ></input>
  );
};

export default React.memo(Input);
