import React from 'react';

// const ModalView = ({ setModal, article, actionType , getData , setActionType }) => (
const ModalView = ({ setModal, children, title }) => (
  <div id='myModal' className='modal'>
    <div className='modal-content'>
      <div className='modal-header'>
        <h2>{title}</h2>
        <span className='close' onClick={() => setModal(false)}>
          &times;
          </span>
      </div>
      <div className='modal-body'>
        {
          children
        }
      </div>
    </div>
  </div>
);

export default ModalView;