import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Counter from './components/counter';
import Home from './components/home';
import Todo from './components/todo';
import DefaultPage from './DefaultPage';
import './index.css'
import store from "./store/store";


const container = document.getElementById('root') as HTMLElement
const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultPage />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'counter/',
        element: <Counter />
      },
      {
        path: 'todo/',
        element: <Todo />
      }
    ]
  }
])


createRoot(container).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
