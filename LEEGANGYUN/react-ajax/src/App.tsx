import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './store/store';
import GetCat from './components/GetCat';

export default function App() {
  return (
    <Provider store={store}>
      <GetCat />
    </Provider>
  )
}