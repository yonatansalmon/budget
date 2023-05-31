import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root') as Element;
createRoot(rootElement).render( <Provider store={store}><App /></Provider> );
