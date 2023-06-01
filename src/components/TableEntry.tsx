import React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { supabase } from '../db/supabase';
import { deleteEntry } from '../redux/budgetSlice';

interface Entry {
  amount: number;
  category: string;
  created_at: string;
  id: string;
}

interface Props {
  entry: Entry;
}

const TableEntry: React.FC<Props> = ({ entry }) => {
  const budget = useAppSelector((state) => state.budget);
  const dispatch = useAppDispatch();

  const getDate: () => string = () => {
    const date = new Date(entry.created_at);
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero indexed, so we need to add 1
    let year = String(date.getFullYear()).substr(2);
    let formattedDate = day + '/' + month + '/' + year;
    return formattedDate;
  };

  const handleDelete = async () => {
    try {
      const { status } = await supabase.from('budget').delete().match({ id: entry.id });
      console.log(status)
      if (status === 204) {
        dispatch(deleteEntry(entry.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rowColor = entry.amount > 0 ? '#0aff0a' : '#ff0000';
  return (
    <tr style={{ color: rowColor }}>
      <td className='AmountCell'>{entry.amount}₪</td>
      <td>{entry.category}</td>
      <td>{getDate()}</td>
      <td className='DeleteCell' >
        <div className='DeleteBtn' onClick={handleDelete}>
          &times;
        </div>
      </td>
    </tr>
  );
};

export default TableEntry;
