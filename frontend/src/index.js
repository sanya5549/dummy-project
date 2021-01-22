import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { Provider } from 'react-redux';
import { createStore, getState } from 'redux';
import rootReducer from './reducer/rootReducer';


function saveToLocalStorage(state){
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  }catch(e){
    console.log(e);
  }
}

function loadFromLocalStorage(){
  try{
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) return undefined;
    return JSON.parse(serializedState);
  }catch(e){
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();
const store = createStore(rootReducer,persistedState);
store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
