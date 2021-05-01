import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import MovieForm from '../../../components/MovieForm/MovieForm';
// import './MovieAdd.scss';
import { connect } from 'react-redux';
import { movieAdd } from '../../../redux/movie/movie.actions';

const MovieAddModal: React.FC<any> = props => {
  const formRef: any = useRef();

  function addMovie() {
    console.log(formRef.current);
    if (formRef.current) {
      formRef.current.handleSubmit();
      console.log(formRef.current);
    }
    if (formRef.current && formRef.current.dirty && formRef.current.isValid) {
      let movie = formRef.current.values;
      props.movieAddProp(movie);
      props.onModalClose();
    }
  }

  function resetForm() {
    formRef.current.handleReset();
  }

  function onModalCancel() {}

  return (
    <Modal
      title="Add Movie"
      submitText="Submit"
      cancelText="Reset"
      onModalClose={props.onModalClose}
      onModalCancel={resetForm}
      onModalSubmit={addMovie}
    >
      <MovieForm formRef={formRef}></MovieForm>
    </Modal>
  );
};

function mapDispatchProps(dispatch) {
  return {
    movieAddProp: movie => {
      dispatch(movieAdd(movie));
    },
  };
}
export default connect(null, mapDispatchProps)(MovieAddModal);
