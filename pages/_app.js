import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from '../redux/reducers';

function MyApp({ Component, pageProps }) {
  
  
  const store = createStore(allReducers);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
