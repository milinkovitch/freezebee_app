import './assets/css/index.less';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import Loading from './components/layouts/Loading';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
