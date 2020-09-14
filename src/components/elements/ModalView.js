import React from 'react';
import { ArticleForm } from './ArticleForm';

const ModalView = ({ setModal, article, actionType , getData , setActionType }) => (
    <div id='myModal' className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <span className='close' onClick={() => setModal(false)}>
            &times;
          </span>
          <h2>Modal Header</h2>
        </div>
        <div className='modal-body'>
          <ArticleForm article={article} actionType={actionType} setActionType={setActionType}  getData={getData} />
        </div>
      </div>
    </div>
  );

  export default ModalView;