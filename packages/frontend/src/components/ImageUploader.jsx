import React, { Component, Fragment } from 'react';
import ImageUploaderButton from './ImageUploaderButton';
import ImageUploaderModal from './ImageUploaderModal';

export default class ImageUploader extends Component {
  state = {
    replaced: false,
  }

  componentDidMount() {
    this.replaceToolbarWithPortal();
  }

  componentDidUpdate() {
    this.replaceToolbarWithPortal();
  }

  replaceToolbarWithPortal() {
    if (!this.state.replaced) {
      const child = document.querySelector('span.firepad-tb-insert-image');
      if (child) {
        const parent = child.parentNode;
        this.uploadButtonElement = parent.parentNode;
        this.uploadButtonElement.removeChild(parent);
        this.setState({ replaced: true });
      }
    }
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
    const dialog = document.getElementById('overlay');
    dialog.style.visibility = 'hidden';
    this.props.firepadInst.firepadWrapper_.removeChild(dialog);
  }

  launchImageUploadModal = () => {
    this.props.firepadInst.makeImageDialog_();
    this.setState({ modalOpen: true });
  }

  render() {
    return (
      <Fragment>
        <ImageUploaderButton
          uploadButtonElement={this.uploadButtonElement}
          launchImageUploadModal={this.launchImageUploadModal}
        />
        <ImageUploaderModal
          closeModal={this.closeModal}
          modalOpen={this.state.modalOpen}
        />
      </Fragment>
    );
  }
}
