import { useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
// import { increment } from '../redux/budgetSlice';

const Budget = () => {
  const budget = useAppSelector((state) => state.budget);
  const dispatch = useAppDispatch();

  const deposits = useMemo(() => {
    return budget.entries.filter((entry) => entry.amount > 0).reduce((acc: any, curr: any) => acc + Number(curr.amount), 0);
  }, [budget.total, budget.entries]);

  const withdrawals = useMemo(() => {
    return budget.entries.filter((entry) => entry.amount < 0).reduce((acc: any, curr: any) => acc + Number(curr.amount), 0);
  }, [budget.total, budget.entries]);

  return (
    <div className='SpendandSave'>
      <div>
        <h2>Deposit</h2>
        <div className='Deposit'>{deposits}₪</div>
      </div>
      <div>
        <h2>Withdrawal</h2>
        <div className='Withdrawal'>{withdrawals}₪</div>
      </div>
    </div>
  );
};

export default Budget;
