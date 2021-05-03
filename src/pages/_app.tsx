import React from 'react';
import '../styles/style.scss';
import { useStore } from '../redux';
import { Provider } from 'react-redux';

const App: any = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <div className="main-logo">
        <div className="container">
          <div className="logo">
            <span>netflix</span>roulette
          </div>
        </div>
      </div>

      <div className="page-wrapper">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
};

export default App;
