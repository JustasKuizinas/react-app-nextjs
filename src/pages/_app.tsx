import React, { useCallback, useState } from 'react';
import '../styles/style.scss';
import { MODAL } from '../types';
import ConfirmModal from '../containers/Modal/Confirm/Confirm';
import MovieAddModal from '../containers/Modal/MovieAdd/MovieAdd';
import MovieEditModal from '../containers/Modal/MovieEdit/MovieEdit';
import { useStore } from '../redux';
import { Provider } from 'react-redux'

let moviesJSON = [];

const App = ({ Component, pageProps }) => {
  let [modalData, setModalData] = useState<{ [key: string]: any }>({});
  let [activeModalType, setActiveModalType] = useState(null);
  let [activeMovie, setActiveMovie] = useState(null);
  const store = useStore(pageProps.initialReduxState);

  const openModal = useCallback((activeModalType = null, modalData = {}) => {
    document.querySelector('body').classList.add('modal-open');
    setModalData(modalData);
    setActiveModalType(activeModalType);
  }, []);

  const closeModal = useCallback(() => {
    document.querySelector('body').classList.remove('modal-open');
    setModalData({});
    setActiveModalType(null);
  }, []);

  function deleteMovie(id) {
    // props.movieDeleteProp(id);
    closeModal();
  }

  function renderModals() {
    if (!activeModalType) return;
    let modal;
    if (activeModalType == MODAL.MOVIE_ADD) {
      modal = <MovieAddModal onModalClose={closeModal} {...modalData} />;
    }
    if (activeModalType == MODAL.MOVIE_EDIT) {
      modal = <MovieEditModal onModalClose={closeModal} {...modalData} />;
    }
    if (activeModalType == MODAL.MOVIE_DELETE) {
      modal = (
        <ConfirmModal
          onModalSubmit={deleteMovie.bind(null, modalData.id)}
          onModalClose={closeModal}
          {...modalData}
        />
      );
    }

    return modal;
  }

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

      {renderModals()}
    </Provider>
  );
};

export default App;
