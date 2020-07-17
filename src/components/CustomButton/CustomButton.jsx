import React from 'react';
import './CustomButton.scss';

const CustomButton = (props) => {
  const classNames = ['custom-button'];
  const { className, icon, onClickHandler } = props;

  if (className) {
    classNames.push(className);
  }

  return (
    <button className={classNames.join(' ')} onClick={onClickHandler}>
      {icon}
    </button>
  );
};

export default React.memo(CustomButton);
