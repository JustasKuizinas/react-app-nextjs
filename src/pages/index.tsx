import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../containers/ErrorBoundary/ErrorBoundary';
import Header from '../containers/Header/Header';
import MoviesList from '../containers/MoviesList/MoviesList';
import Footer from '../components/Footer/Footer';

const Home: React.FC<any> = props => {
  return (
    <>
      <ErrorBoundary>
        <Header openModal={props.openModal} />
        <MoviesList openModal={props.openModal} />
      </ErrorBoundary>
      <Footer />
    </>
  );
};

export default Home;
