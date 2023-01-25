import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import store from './stores/store';
import './index.css';
import DefaultPage from './pages/DefaultPage';
import HomePage from './pages/home/HomePage';
import persistStore from 'redux-persist/es/persistStore';

const container = document.getElementById('root') as HTMLElement;
const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      }
    ]
  },
]);


createRoot(container).render(
  <Provider store={store}>

    <RouterProvider router={router} />

  </Provider >
);
