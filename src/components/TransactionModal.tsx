import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { close, open } from '../redux/modalSlice';
import { addEntry } from '../redux/budgetSlice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

function TransactionModal() {
  const [balanceEntry, setBalanceEntry] = useState({ balance: 0, category: '' });
  const modalState = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const handleTransaction = () => {
    if (modalState.selectedId) {
      dispatch(addEntry(balanceEntry));
    } else {
    }
  };

  return (
    <>
      <Modal show={modalState.show} onHide={() => dispatch(close())}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Select>
              <option>Category</option>
              <option value='1'>One</option>
              <option value='2'>Two</option>
              <option value='3'>Three</option>
            </Form.Select>
            <Form.Control type='number' placeholder='amount' className='Amount mt-3' />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={modalState.selectedId ? 'primary' : 'danger' }  onClick={handleTransaction}>
           {modalState.selectedId ? '+' : '-'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TransactionModal;
