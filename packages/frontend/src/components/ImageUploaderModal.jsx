import React, { Fragment } from 'react';
import ReactDom from 'react-dom';

export default function ImageUploaderModal({ closeModal, modalOpen }) {
  if (modalOpen) {
    const element = document.querySelector('.firepad-dialog-div');
    element.innerHTML = '';
    return ReactDom.createPortal(
      (
        <Fragment>
          <input className="firepad-dialog-input" id="img" type="text" placeholder="Insert image url" autoFocus="autofocus" />
          <div className="firepad-btn-group">
            <a className="firepad-btn" id="submitbtn">
              Submit
            </a>
            <a onClick={closeModal} className="firepad-btn">
              Cancel
            </a>
          </div>
        </Fragment>
      ),
      element,
    );
  }
  return null;
}
