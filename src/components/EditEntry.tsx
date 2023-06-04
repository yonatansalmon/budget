import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { supabase } from '../db/supabase';
import { editEntry } from '../redux/budgetSlice';

interface Entry {
  amount: number;
  category: string;
  created_at: string;
  id: string;
}

interface Props {
  entry: Entry;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setIsColumn: Dispatch<SetStateAction<boolean>>;

  isColumn: boolean;
}

const EditEntry: React.FC<Props> = ({ entry, setIsEdit, isColumn, setIsColumn }) => {
  const [balanceEntry, setBalanceEntry] = useState<any>(entry || { amount: 0, category: '' });

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

  const handleChange = (e: React.ChangeEvent<any>) => {
    setBalanceEntry({ ...balanceEntry, [e.currentTarget.name]: e.currentTarget.value.trim() });
  };

  const handleEdit = async () => {
    try {
      console.log('entry', balanceEntry);
      const { status } = await supabase.from('budget').update(balanceEntry).eq('id', balanceEntry.id);
      if (status === 204) {
        dispatch(editEntry(balanceEntry));
      }
    } catch (error) {
      console.log(error);
    }
    setIsEdit(false);
    setIsColumn(false);
  };

  const rowColor = entry.amount > 0 ? '#0aff0a' : '#ff0000';
  return (
    <tr style={{ color: rowColor }}>
      <td className='AmountCell'>
        <Form.Control
          type='number'
          value={balanceEntry.amount}
          placeholder='Amount'
          name='amount'
          className='Amount mt-3'
          onChange={handleChange}
          required
        />
      </td>
      <td>
        <Form.Control
          type='text'
          value={balanceEntry.category}
          placeholder='Category'
          name='category'
          className='Amount mt-3'
          onChange={handleChange}
          required
        />
      </td>
      <td>{getDate()}</td>
      <td className='EditCell'>
        <div className='EditBtn' onClick={handleEdit}>
          &#x270E;
        </div>
      </td>
    </tr>
  );
};

export default EditEntry;
