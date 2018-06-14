import React, { Component } from 'react';
import Quill from 'quill';
import { database } from 'firebase';
import { DOCUMENTS } from '@the-source-of-truth/shared/constants';
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

export default class UrimContainer extends Component {
  componentDidMount() {
    this.ref = database().ref(DOCUMENTS).push();
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
