import React from 'react';
import { close, open } from '../redux/modalSlice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

const Minus = () => {
  const dispatch = useAppDispatch();
  return (
    <div className='MinusBtn' id='0' onClick={(e) => dispatch(open((e.currentTarget.id)))}>
      <span>-</span>
    </div>
  );
};

export default Minus;
