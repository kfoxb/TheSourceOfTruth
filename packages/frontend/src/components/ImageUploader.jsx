import React, { Component } from 'react';
import ReactDom from 'react-dom';

export default class ImageUploader extends Component {
  state = {
    replaced: false,
  }

  render() {
    console.log('in ImageUploader', this.state.replaced);
    // if (!this.state.replaced) {
    // const imgToolbar = document.querySelector('span.firepad-tb-insert-image');
    // const imgToolbar = document.querySelector('.firepad-toolbar-wrapper');
    // const imgToolbarParent = imgToolbar && imgToolbar.parentNode;
    // if (imgToolbarParent) {
    // imgToolbarParent.removeChild(imgToolbar);
    // window.parent = imgToolbarParent;
    // if (imgToolbar) {
    //    ReactDom.createPortal(<div className="firepad-tb-insert-image">hi</div>, imgToolbar);
    // }
    // this.setState({ replaced: true });
    // }
    // }
    const child = document.querySelector('span.firepad-tb-insert-image');
    const parent = child && child.parentNode;
    return (
      <div>
        {
        parent &&
          ReactDom.createPortal(
            <div className="firepad-tb-insert-image">hi</div>,
            child.parentNode,
          )
      }
      </div>
    );
  }
}
