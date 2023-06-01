import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { supabase } from '../db/supabase';
import { useNavigate } from 'react-router-dom';


const Budget = () => {
  const budget = useAppSelector((state) => state.budget);
  const navigate = useNavigate();


  return (
    <div className='BalanceContainer' onClick={() => navigate('/dashboard')}>
      <h1>Balance</h1>
      <div className='Balance'>{budget.total}₪</div>
    </div>
  )
}

export default Budget;
