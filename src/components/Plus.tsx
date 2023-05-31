import React from 'react';
import { close, open } from '../redux/modalSlice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

const Plus = () => {
  const dispatch = useAppDispatch();
  return (
    <div className='AddBtn' id='1' onClick={(e) => dispatch(open(e.currentTarget.id))}>
      <span>+</span>
    </div>
  );
};

export default Plus;
