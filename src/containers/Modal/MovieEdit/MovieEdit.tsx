import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import MovieForm from '../../../components/MovieForm/MovieForm';
// import './MovieEdit.scss';
import { connect } from 'react-redux';
import { movieEdit } from '../../../redux/movie/movie.actions';

const MovieEditModal: React.FC<any> = props => {
  let movie = props.movie;
  const formRef: any = useRef();

  function editMovie() {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }

    if (formRef.current && formRef.current.dirty && formRef.current.isValid) {
      let movie = formRef.current.values;
      props.movieEditProp(movie);
      props.onModalClose();
    }
  }

  function resetForm() {
    formRef.current.handleReset();
  }

  return (
    <Modal
      title="edit movie"
      submitText="edit"
      cancelText="Reset"
      onModalClose={props.onModalClose}
      onModalCancel={resetForm}
      onModalSubmit={editMovie}
    >
      <MovieForm formRef={formRef} movie={props.movie}></MovieForm>
    </Modal>
  );
};

function mapDispatchProps(dispatch) {
  return {
    movieEditProp: movie => dispatch(movieEdit(movie)),
  };
}
export default connect(null, mapDispatchProps)(MovieEditModal);
