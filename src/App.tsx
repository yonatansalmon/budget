import './App.css';
import Budget from './components/Budget';
import Balance from './components/Balance';

import TransActions from './components/TransActions';
import ModalPortal from './portal/ModalPortal';
import { useEffect } from 'react';
import { supabase } from './db/supabase';
import { setEntries } from './redux/budgetSlice';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import Reset from './components/Reset';

function App() {
  const dispatch = useAppDispatch();
  const getAllData: any = async () => {
    const { data, error }: any = await supabase.from('budget').select();
    if (error) {
      console.log(error);
    } else {
      dispatch(setEntries(data));
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className='MainContainer'>
      <Reset />
      <Budget />
      <Balance />
      <TransActions />
      <ModalPortal />
    </div>
  );
}

export default App;
