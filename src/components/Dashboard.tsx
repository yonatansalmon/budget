import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import TableEntry from './TableEntry';
import NavLink from './NavLink';
import Reset from './Reset';
import EditEntry from './EditEntry';

const Dashboard = () => {
  const budget = useAppSelector((state) => state.budget);
  const [isColumn, setIsColumn] = useState(true);

  console.log(isColumn);

  return (
    <div className='DashboardContainer'>
      <NavLink link='' label='Budget' />
      <div className='TableContainer'>
        <Table striped bordered hover className='DashboardTable'>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th></th>
              {isColumn && <th></th>}
            </tr>
          </thead>

          <tbody>
            {budget.entries.map((entry: any) => (
              <TableEntry key={entry.id} entry={entry} setIsColumn={setIsColumn} isColumn={isColumn} />
            ))}
          </tbody>
        </Table>
      </div>
      <Reset />
    </div>
  );
};

export default Dashboard;
