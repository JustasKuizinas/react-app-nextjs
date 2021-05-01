import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
// import './Confirm.scss';

const ConfirmModal: React.FC<any> = props => {
  return (
    <Modal
      title={props.title}
      submitText="Confirm"
      submitContent={props.submitContent}
      onModalClose={props.onModalClose}
      onModalSubmit={props.onModalSubmit}
    ></Modal>
  );
};

export default ConfirmModal;
