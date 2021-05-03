import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer/Footer';
import Link from 'next/link';

const NotFound = props => (
  <div className="not-found">
    <div className="not-found__content">
      <h2>Page Not Found</h2>
      <img src="/404.png" alt="" />
      <Link href="/">
        <a className="btn -outline">GO BACK HOME</a>
      </Link>
    </div>
    <Footer />
  </div>
);

export default NotFound;
