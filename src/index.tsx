import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

document.addEventListener("visibilitychange", function() {
  console.log('visibilitychange: ', document.hidden, document.visibilityState);
}, false);

window.addEventListener('focus', function(){
  console.log('focus: ', this.document.hasFocus());
}, false);

window.addEventListener('blur', function(){
  console.log('focus: ', this.document.hasFocus());
}, false);

window.addEventListener('error', function(event) { 
  /* 
  Maybe here we can detect if some embedded app crashes 
  and resolve it better than crashing whole workbook.
  */
  console.log('Uncaught error');
  console.log(event);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
