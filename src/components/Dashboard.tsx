import React from 'react';
import Table from 'react-bootstrap/Table';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import TableEntry from './TableEntry';
import NavLink from './NavLink';
import Reset from './Reset';

const Dashboard = () => {
  const budget = useAppSelector((state) => state.budget);
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
            </tr>
          </thead>
          <tbody>
            {budget.entries.map((entry: any) => (
              <TableEntry key={entry.id} entry={entry} />
            ))}
          </tbody>
        </Table>
      </div>
      <Reset />
    </div>
  );
};

export default Dashboard;
