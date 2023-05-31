import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

const Budget = () => {
  const budget = useAppSelector((state) => state.budget);
  console.log(budget);

  return (
      <div className='BalanceContainer'>
        <h3>Balance</h3>
        <div className='Balance'>{budget.balance}</div>
      </div>
  );
};

export default Budget;
