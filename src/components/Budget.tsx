import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
// import { increment } from '../redux/budgetSlice';

const Budget = () => {
  const budget = useAppSelector((state) => state.budget);
  // const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(budget);
  }, [budget]);

  // const myfunc = () => {
  //   dispatch(increment());
  // };
  return (
    <div className='SpendandSave'>
      <div>
        <h2>Spend</h2>
        <div className='Spend'>{0}</div>
      </div>
      <div>
        <h2>Save</h2>
        <div className='Save'>{0}</div>
      </div>
    </div>
  );
};

export default Budget;
