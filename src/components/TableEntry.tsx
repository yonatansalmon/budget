import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { supabase } from '../db/supabase';
import { deleteEntry } from '../redux/budgetSlice';
import EditEntry from './EditEntry';

interface Entry {
  amount: number;
  category: string;
  created_at: string;
  id: string;
}

interface Props {
  entry: Entry;
  setIsColumn: Dispatch<SetStateAction<boolean>>;
  isColumn: boolean;
}

const TableEntry: React.FC<Props> = ({ entry, setIsColumn, isColumn }) => {
  const [isEdit, setIsEdit] = useState(false);
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
      if (status === 204) {
        dispatch(deleteEntry(entry.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsEdit = async () => {
    setIsColumn(true);
    setIsEdit(true);
  };

  const rowColor = entry.amount > 0 ? '#0aff0a' : '#ff0000';
  return (
    <>
      {!isEdit ? (
        <tr style={{ color: rowColor }}>
          <td className='AmountCell'>{entry.amount}₪</td>
          <td>{entry.category}</td>
          <td>{getDate()}</td>
          {!isColumn && (
            <td className='DeleteCell'>
              <div
                className='DeleteBtn'
                onClick={() => {
                  if (window.confirm('Delete?')) handleDelete();
                }}
              >
                &times;
              </div>
            </td>
          )}
          <td onClick={handleIsEdit}>&#x270E;</td>
        </tr>
      ) : (
        <EditEntry setIsEdit={setIsEdit} key={entry.id} entry={entry} isColumn={isColumn} setIsColumn={setIsColumn} />
      )}
    </>
  );
};

export default TableEntry;
