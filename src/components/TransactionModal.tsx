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

  const handleWithdrawal = async (e: any) => {
    e.preventDefault();

    try {
      const modifiedEntry = { ...balanceEntry, amount: balanceEntry.amount * -1 };
      const { data } = await supabase.from('budget').insert(modifiedEntry).select();
      if (data && data.length > 0) {
        dispatch(setEntries([modifiedEntry, ...budget.entries]));
        dispatch(close());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeposit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await supabase.from('budget').insert(balanceEntry).select();
      if (data && data.length > 0) {
        dispatch(setEntries([balanceEntry, ...budget.entries]));
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
          <Form onSubmit={modalState.selectedId ? handleDeposit : handleWithdrawal}>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Control type='text' placeholder='Category' name='category' className='Amount mt-3' onChange={handleChange} required />
              <Form.Control type='number' placeholder='Amount' name='amount' className='Amount mt-3' onChange={handleChange} required />
            </Form.Group>
            <Modal.Footer>{modalState.selectedId ? <Btn variant='primary' text='+' /> : <Btn variant='danger' text='-' />}</Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TransactionModal;
