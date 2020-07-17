import React from 'react';

const Button = (props) => {
  const { className, onClickHandler, text } = props;

  return (
    <button className={className} onClick={onClickHandler}>
      {text}
    </button>
  );
};

export default React.memo(Button);
