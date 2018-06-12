import React from 'react';
import ReactDom from 'react-dom';
import Button from '@material-ui/core/Button';
import Image from '@material-ui/icons/Image';

export default function ImageUploaderButton({ uploadButtonElement, launchImageUploadModal }) {
  if (uploadButtonElement) {
    return ReactDom.createPortal(
      (
        <Button onClick={launchImageUploadModal} className="firepad-btn">
          <Image />
        </Button>
      ),
      uploadButtonElement,
    );
  }
  return null;
}
