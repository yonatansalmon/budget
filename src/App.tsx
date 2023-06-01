import BudgetPage from './components/BudgetPage';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { useEffect } from 'react';
import { supabase } from './db/supabase';
import { setEntries } from './redux/budgetSlice';
import { useAppSelector, useAppDispatch } from './redux/hooks';

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
    <Routes>
      <Route path='/' element={<BudgetPage />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
