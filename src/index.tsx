import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from './app/store'
import { Provider } from 'react-redux'
import './index.css';
import { fetchUsers } from './features/users/usersSlice'
import { worker } from './api/server'


async function main() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })
  store.dispatch(fetchUsers())

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
main()






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
