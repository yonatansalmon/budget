import { useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { close, open } from '../redux/modalSlice';

const Budget  = () => {
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
      <div id='1' onClick={(e) => dispatch(open(e.currentTarget.id))}>
        <h4>Deposit</h4>
        <div className='Deposit'>{deposits}₪</div>
      </div>
      <div id='0' onClick={(e) => dispatch(open(e.currentTarget.id))}>
        <h4>Withdrawal</h4>
        <div className='Withdrawal'>{withdrawals}₪</div>
      </div>
    </div>
  );
};

export default Budget;
