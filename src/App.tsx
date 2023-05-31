import './App.css';
import Budget from './components/Budget';
import Balance from './components/Balance';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import TransActions from './components/TransActions';
import ModalPortal from './portal/ModalPortal';
import { useEffect } from 'react';

function App() {


  return (
    <Provider store={store}>
      <div className='MainContainer'>
        <Budget />
        <Balance />
        <TransActions />
        <ModalPortal />
      </div>
    </Provider>
  );
}

export default App;
