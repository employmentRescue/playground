import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import DefaultPage from './pages/DefaultPage';
import HomePage from './pages/HomePage';

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
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
