import React, { Component } from 'react';
import Quill from 'quill';
import { database } from 'firebase';
import { DOCUMENTS } from '@the-source-of-truth/shared/constants';
import { connect } from 'react-redux';
import 'quill/dist/quill.snow.css';

window.Quill = Quill;
const { fromQuill } = require('urim/dist/firepad');

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],

  ['link', 'image'],

  [{ font: [] }],
  ['clean'],
];

class UrimContainer extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.init();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isAuthenticated && this.props.isAuthenticated) {
      this.init();
    }
  }
  init() {
    // this.ref = database().ref(DOCUMENTS).push();
    this.ref = database().ref(DOCUMENTS).child('-LF-RIgsmWhetrn5vJBR');
    console.log('key', this.ref.key);
    const editor = new Quill('#editor-container', {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: 'snow', // or 'bubble'
    });
    const pad = fromQuill(this.ref, editor, null);
    pad.on('ready', () => {
      console.log('ready');
    });
  }

  render() {
    return (<div id="editor-container" />);
  }
}

const mapStateToProps = state => ({
  claims: state.user.claims,
  isAuthenticated: state.user.isAuthenticated,
  uid: state.user.uid,
});

export default connect(mapStateToProps)(UrimContainer);
