import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import Dropzone from 'react-dropzone';

export default function ImageUploaderModal({ closeModal, handleImage, modalOpen }) {
  if (modalOpen) {
    const element = document.querySelector('.firepad-dialog-div');
    element.innerHTML = '';
    return ReactDom.createPortal(
      (
        <Fragment>
          <Dropzone
            accept="image/gif, image/jpeg, image/png, image/svg+xml"
            onDrop={handleImage}
          />
          <div className="firepad-btn-group">
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
