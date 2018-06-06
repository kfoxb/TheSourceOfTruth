import React from 'react';
import ReactDom from 'react-dom';

export default function ImageUploaderButton({ uploadButtonElement, launchImageUploadModal }) {
  if (uploadButtonElement) {
    return ReactDom.createPortal(
      (
        <a onClick={launchImageUploadModal} className="firepad-btn">
          <span className="firepad-tb-insert-image" />
        </a>
      ),
      uploadButtonElement,
    );
  }
  return null;
}
