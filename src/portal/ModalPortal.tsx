import React from 'react';
import {createPortal} from 'react-dom';
import TransactionModal from '../components/TransactionModal';
import { Modal } from 'react-bootstrap';

const ModalPortal: React.FC = () => {
  const modalRoot: any = document.getElementById('modal-root');

  return (
    <div>
      {createPortal(<TransactionModal/>, modalRoot)};
    </div>
  );
};

export default ModalPortal;
