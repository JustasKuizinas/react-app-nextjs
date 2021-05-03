import React, { Component, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../containers/ErrorBoundary/ErrorBoundary';
import Header from '../containers/Header/Header';
import MoviesList from '../containers/MoviesList/MoviesList';
import Footer from '../components/Footer/Footer';
import { useDispatch } from 'react-redux';
import { movieDelete, movieInit } from '../redux/movie/movie.actions';
import { MODAL } from '../types';
import ConfirmModal from '../containers/Modal/Confirm/Confirm';
import MovieAddModal from '../containers/Modal/MovieAdd/MovieAdd';
import MovieEditModal from '../containers/Modal/MovieEdit/MovieEdit';
import MovieService from '../services/movie/movie.service';
import { initializeStore } from '../redux';

export const getStaticProps = async appContext => {
  const reduxStore = initializeStore({});
  const { dispatch } = reduxStore;

  let movies = await MovieService.getAll(1000);
  dispatch(movieInit(movies));

  return { props: { initialReduxState: reduxStore.getState() } };
};

const Home: React.FC<any> = props => {
  const [modalData, setModalData] = useState<{ [key: string]: any }>({});
  const [activeModalType, setActiveModalType] = useState(null);
  const dispatch = useDispatch();

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
    dispatch(movieDelete(id));
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
    <>
      <ErrorBoundary>
        <Header openModal={openModal} />
        <MoviesList openModal={openModal} />
      </ErrorBoundary>
      <Footer />
      {renderModals()}
    </>
  );
};

export default Home;
