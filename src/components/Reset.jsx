import React from 'react';
import { Button } from 'react-bootstrap';
import { reset } from '../redux/budgetSlice';
import { useDispatch } from 'react-redux';
import { supabase } from '../db/supabase';

const Reset = () => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Delete?')) {
      handleReset();
    } else {
      return;
    }
  };

  const handleReset = async () => {
    try {
      const { status } = await await supabase.from('budget').delete().neq('id', 0);
      if (status === 204) {
        dispatch(reset());
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button className='mb-4 ResetBtn' onClick={handleDelete}>
      Reset Dashboard
    </Button>
  );
};

export default Reset;
