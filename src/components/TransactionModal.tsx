import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Modal, Form, Button, Badge } from 'react-bootstrap';
import { close, open } from '../redux/modalSlice';
import { setEntries } from '../redux/budgetSlice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { supabase } from '../db/supabase';
import Btn from './Btn';
import CategoryBadge from './CategoryBadge';

function TransactionModal() {
  const [balanceEntry, setBalanceEntry] = useState<any>({ amount: 0, category: '' });
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryColors, setCategoryColors] = useState<{ [category: string]: string }>({});

  const modalState = useAppSelector((state) => state.modal);
  const budget = useAppSelector((state) => state.budget);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const uniqueCategories: string[] = [];
    const newCategoryColors: { [category: string]: string } = {};
    budget.entries.forEach((entry) => {
      if (!uniqueCategories.includes(entry.category)) {
        uniqueCategories.push(entry.category);
        newCategoryColors[entry.category] = getRandomColor(); // Assign a random color
      }
    });
    setCategories(uniqueCategories);
    setCategoryColors(newCategoryColors); // Set the new colors
  }, [budget.entries]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setBalanceEntry({ ...balanceEntry, [e.currentTarget.name]: e.currentTarget.value.trim() });
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

    setBalanceEntry({ amount: 0, category: '' });
  };

  const getRandomColor = () => {
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
  };

  const setCategory = useCallback(
    (category: string) => {
      setBalanceEntry({ ...balanceEntry, category });
    },
    [balanceEntry]
  );

  return (
    <>
      <Modal show={modalState.show} onHide={() => dispatch(close())}>
        <Modal.Header>
          {categories.map((category, i) => (
            <CategoryBadge key={i} setCategory={setCategory} category={category} color={categoryColors[category]} />
            ))}
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTransAction} className='TransactionForm'>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Control
                type='text'
                value={balanceEntry.category}
                placeholder='Category'
                name='category'
                className='Amount mt-3'
                onChange={handleChange}
                required
              />
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
