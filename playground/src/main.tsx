import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import store from './stores/store';
import './index.css';
import { UserDefaultPage, DefaultPage } from './pages/DefaultPages';
import HomePage from './pages/home/HomePage';
import { LoginPage, LoginFailPage, LoginRegisterPage, LoginSuccessPage } from './pages/user/UserAuthPages';
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
      },
    ]
  },
  {
    path: '/',
    element: <UserDefaultPage />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'login/register',
        element: <LoginRegisterPage />
      },
      {
        path: 'login/fail',
        element: <LoginFailPage />,
      },
      {
        path: 'login/success',
        element: <LoginSuccessPage />,
      },
    ]
  }
]);


createRoot(container).render(
  <Provider store={store}>

    <RouterProvider router={router} />

  </Provider >
);
