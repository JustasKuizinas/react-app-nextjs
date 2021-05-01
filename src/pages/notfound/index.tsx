import React from 'react';
import PropTypes from 'prop-types';
// import './NotFound.scss';
import Footer from '../../components/Footer/Footer';
// import { NavLink } from 'react-router-dom';

const NotFound = props => (
  <div className="not-found">
    <div className="not-found__content">
      <h2>Page Not Found</h2>
      <img src="/404.png" alt="" />
      {/* <NavLink to="/" className="btn -outline">
        GO BACK HOME
      </NavLink> */}
    </div>
    <Footer />
  </div>
);

NotFound.propTypes = {
  // bla: PropTypes.string,
};

NotFound.defaultProps = {
  // bla: 'test',
};

export default NotFound;
