import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { supabase } from '../db/supabase';

const Budget = () => {
  const budget = useAppSelector((state) => state.budget);


  return (
    <div className='BalanceContainer'>
      <h1>Balance</h1>
      <div className='Balance'>{budget.total}₪</div>
    </div>
  )
}

export default Budget;
