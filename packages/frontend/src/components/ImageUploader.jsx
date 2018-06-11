import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ImageUploaderButton from './ImageUploaderButton';
import ImageUploaderModal from './ImageUploaderModal';

export default class ImageUploader extends Component {
  static propTypes = {
    firepadInst: PropTypes.shape({
      firepadWrapper_: PropTypes.shape({
        removeChild: PropTypes.func.isRequired,
      }),
      makeImageDialog_: PropTypes.func.isRequired,
    }),
  }

  static defaultProps = {
    firepadInst: null,
  }

  state = {
    replaced: false,
  }

  componentDidMount() {
    this.replaceToolbarWithPortal();
  }

  componentDidUpdate() {
    this.replaceToolbarWithPortal();
  }

  handleImage = (files) => {
    console.log('files', files);
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
    const { firepadInst } = this.props;
    if (firepadInst) {
      // eslint-disable-next-line no-underscore-dangle
      this.props.firepadInst.firepadWrapper_.removeChild(dialog);
    }
  }

  launchImageUploadModal = () => {
    const { firepadInst } = this.props;
    if (firepadInst) {
      // eslint-disable-next-line no-underscore-dangle
      this.props.firepadInst.makeImageDialog_();
      this.setState({ modalOpen: true });
    }
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
          handleImage={this.handleImage}
          modalOpen={this.state.modalOpen}
        />
      </Fragment>
    );
  }
}
