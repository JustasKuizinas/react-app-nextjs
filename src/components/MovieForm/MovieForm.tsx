import React from "react";
import PropTypes from 'prop-types';
// import './MovieForm.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';
import MultiSelect from 'react-multi-select-component';
import { MOVIE_GENRES, MOVIE_GENRES_FULL } from '../../types';
import { useEffect } from 'react';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormInput from './FormInput/FormInput';

const MovieForm: React.FC<any> = props => {
  let [selectedGenres, setGenres] = useState([]);
  let allGenres = [...Object.values(MOVIE_GENRES_FULL)];
  allGenres.shift();
  let movieOptions = [];
  let initialMovieGenres = [];

  movieOptions = allGenres.map(genre => ({
    label: genre,
    value: genre,
  }));

  const ValidationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    tagline: Yup.string().required('Required'),
    release_date: Yup.string().required('Required'),
    poster_path: Yup.string()
      .url('Poster path must be a valid URL')
      .required('Required'),
    genres: Yup.array()
      .min(1, 'Select at least 1 item')
      .required('Select at least 1 item'),
    overview: Yup.string().required('Required'),
    runtime: Yup.number().required('Required'),
  });

  let initialValues: any = {
    title: props.movie?.title ? props.movie.title : '',
    tagline: props.movie?.tagline ? props.movie.tagline : '',
    release_date: props.movie?.release_date ? props.movie.release_date : '',
    poster_path: props.movie?.poster_path ? props.movie.poster_path : '',
    overview: props.movie?.overview ? props.movie.overview : '',
    runtime: props.movie?.runtime ? props.movie.runtime : '',
    genres: props.movie?.genres ? props.movie.genres : [],
  };

  if (props.movie?.id) {
    initialValues.id = props.movie.id;
  }

  useEffect(() => {
    let movie = props.movie;
    if (movie) {
      initialMovieGenres = props.movie.genres
        .filter(genre => {
          if (allGenres.includes(genre)) return true;
        })
        .map(genre => ({
          label: genre,
          value: genre,
        }));
      setGenres(initialMovieGenres);
    }
  }, []);

  function multiSelectChange(form, field, genres) {
    let genresArr = genres.map(genre => genre.value);
    form.setFieldValue('genres', genresArr);
    form.setFieldTouched('genres', true);
    setGenres(genres);
    console.log(selectedGenres)
  }

  function onSubmit() {}

  function onReset() {
    setGenres(initialMovieGenres);
  }

  return (
    <div className="movie-form">
      <Formik
        enableReinitialize={true}
        innerRef={props.formRef}
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
        onReset={onReset}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="movie-form__field">
              <FormInput
                name="title"
                type="text"
                label="Title"
                placeholder="Title here"
              ></FormInput>
            </div>
            <div className="movie-form__field">
              <FormInput
                name="tagline"
                type="text"
                label="Tagline"
                placeholder="Tagline here"
              ></FormInput>
            </div>
            <div className="movie-form__field">
              <FormInput
                name="release_date"
                type="date"
                label="Release Date"
                placeholder="Release Date here"
              ></FormInput>
            </div>
            <div className="movie-form__field">
              <FormInput
                name="poster_path"
                type="text"
                label="Poster URL"
                placeholder="Poster URL here"
              ></FormInput>
            </div>

            <Field name="genres">
              {({
                field, // { name, value, onChange, onBlur }
                form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }) => (
                <div
                  className={
                    meta.touched && meta.error
                      ? 'movie-form__field has-error'
                      : 'movie-form__field'
                  }
                >
                  <label>genre</label>
                  <MultiSelect
                    hasSelectAll={false}
                    disableSearch={true}
                    options={movieOptions}
                    value={selectedGenres}
                    onChange={multiSelectChange.bind(null, form, field)}
                    labelledBy={'Select'}
                  />

                  <div className="movie-form__error">
                    {meta.touched && meta.error}
                  </div>
                </div>
              )}
            </Field>

            <div className="movie-form__field">
              <FormInput
                name="overview"
                type="text"
                label="Overview"
                placeholder="Overview here"
              ></FormInput>
            </div>
            <div className="movie-form__field">
              <FormInput
                name="runtime"
                label="Runtime"
                type="number"
                placeholder="Runtime here"
              ></FormInput>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

MovieForm.propTypes = {};
MovieForm.defaultProps = {};

export default MovieForm;
