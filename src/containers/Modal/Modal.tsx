import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './Modal.scss';
import { IoMdClose } from 'react-icons/io';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';

const Modal: React.FC<any> = props => {
  return (
    <div className="modal">
      <div className="modal__body">
        <div className="modal__box">
          <button onClick={props.onModalClose} className="modal__close">
            <IoMdClose />
          </button>
          <div className="modal__box-content">
            <div className="modal__title">{props.title}</div>
            {props.children}
            {props.submitContent && (
              <div className="modal__text">{props.submitContent}</div>
            )}
            <div className="modal__btns">
              {props.cancelText && (
                <Button type="button"  onClick={props.onModalCancel} style="-outline">
                  {props.cancelText}
                </Button>
              )}
              <Button  type="button"  onClick={props.onModalSubmit} style="-trenary">
                {props.submitText}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Modal;
