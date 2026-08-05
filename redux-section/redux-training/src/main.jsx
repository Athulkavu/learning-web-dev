import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import configureStore from './store/configureStore.js'
import { increment,decrement,reset,incrementBy } from './actions/countAction.js'
import {Provider} from 'react-redux';
const store=configureStore();
// console.log(store);
console.log('state',store.getState());

store.subscribe(()=>{
  console.log('state updated',store.getState());
})

store.dispatch(increment());

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
    </Provider>
  // </StrictMode>,
)
