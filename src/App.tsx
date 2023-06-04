import BudgetPage from './components/BudgetPage';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { useEffect } from 'react';
import { supabase } from './db/supabase';
import { setEntries } from './redux/budgetSlice';
import { useAppDispatch } from './redux/hooks';
import { Entries } from './redux/budgetSlice';

function App() {
  const dispatch = useAppDispatch();

  const getAllData = async () => {
    const { data, error }: { data: Entries[] | null; error: any } = await supabase.from('budget').select();
    if (error) {
      console.log(error);
    } else if (data) {
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
