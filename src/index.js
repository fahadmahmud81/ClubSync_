import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContext from './ContextApi/UserContext';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ProSidebarProvider } from 'react-pro-sidebar';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProSidebarProvider>
    <QueryClientProvider client={queryClient}>
      <UserContext>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserContext>
    </QueryClientProvider>
  </ProSidebarProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
