import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
// import './MovieOptions.scss';

const MovieOptions: React.FC<any> = props => {
  const [menuActive, setMenuActive] = useState(false);

  function toggleMenu(e) {
    setMenuActive(!menuActive);
  }

  function stopPropagation(e) {
    e.stopPropagation();
  }

  function renderCircle() {
    return (
      <div onClick={toggleMenu} className="movie-options__circle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }

  function renderMenu() {
    return (
      <div className="movie-options__menu">
        <a onClick={toggleMenu}>x</a>
        <button onClick={props.editMovie}>Edit</button>
        <button onClick={props.deleteMovie}>Delete</button>
      </div>
    );
  }

  return (
    <div
      className="movie-options"
      onMouseLeave={toggleMenu}
      onMouseEnter={toggleMenu}
      onClick={stopPropagation}
    >
      {!menuActive && renderCircle()}
      {menuActive && renderMenu()}
    </div>
  );
};

export default MovieOptions;
