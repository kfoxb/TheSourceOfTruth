import React, { Component } from 'react';
import ReactDom from 'react-dom';

export default class ImageUploader extends Component {
  state = {
    replaced: false,
  }

  componentDidMount() {
    this.replaceWithPortal();
  }

  componentDidUpdate() {
    this.replaceWithPortal();
  }

  replaceWithPortal() {
    if (!this.state.replaced) {
      const child = document.querySelector('span.firepad-tb-insert-image');
      if (child) {
        const parent = child.parentNode;
        this.el = parent.parentNode;
        this.el.removeChild(parent);
        this.setState({ replaced: true });
      }
    }
  }

  render() {
    if (this.el) {
      return ReactDom.createPortal(
        (
          <a className="firepad-btn">
            <span className="firepad-tb-insert-image" />
          </a>
        ),
        this.el,
      );
    }
    return null;
  }
}
