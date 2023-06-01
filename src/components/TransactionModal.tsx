import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { close, open } from '../redux/modalSlice';
import { setEntries } from '../redux/budgetSlice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { supabase } from '../db/supabase';
import Btn from './Btn';

function TransactionModal() {
  const [balanceEntry, setBalanceEntry] = useState({ amount: 0, category: '' });
  const modalState = useAppSelector((state) => state.modal);
  const budget = useAppSelector((state) => state.budget);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<any>) => {
    setBalanceEntry({ ...balanceEntry, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleTransAction = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    let entry;
    balanceEntry.amount = Number(balanceEntry.amount);
    if (modalState.selectedId) {
      entry = balanceEntry;
    } else {
      entry = { ...balanceEntry, amount: balanceEntry.amount * -1 };
    }
    try {
      const { data } = await supabase.from('budget').insert(entry).select();
      if (data && data.length > 0) {
        const newArr: any = [data[0], ...budget.entries];
        dispatch(setEntries(newArr));
        dispatch(close());
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Modal show={modalState.show} onHide={() => dispatch(close())}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTransAction} className='TransactionForm'>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Control type='text' placeholder='Category' name='category' className='Amount mt-3' onChange={handleChange} required />
              <Form.Control type='number' placeholder='Amount' name='amount' className='Amount mt-3' onChange={handleChange} required />
            </Form.Group>
            <Modal.Footer>{modalState.selectedId ? <Btn variant='success' text='+' /> : <Btn variant='danger' text='-' />}</Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TransactionModal;
