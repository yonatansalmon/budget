import Budget from '../components/Budget';
import Balance from '../components/Balance';
import ModalPortal from '../portal/ModalPortal';

import NavLink from './NavLink';

const BudgetPage = () => {
 

  return (
    <div className='BudgetContainer'>
      <NavLink  link='dashboard' label='Dashboard'/>
      <Budget />
      <Balance />
      <ModalPortal />
    </div>
  );
};

export default BudgetPage;
