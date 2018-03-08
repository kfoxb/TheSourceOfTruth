import React, { Component } from 'react';
import firebase from 'firebase';
import Editor from '../components/Editor';

export default class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    if (this.quill) {
      this.quill.focus();
    }
  }

  onChange = (content) => {
    this.db.collection('editor').doc('test').set({
      value: content,
    })
      .catch(err => console.log('err writing to firebase: ', err));
    this.setState({ value: content });
  }

  setRef = (ref) => { this.quill = ref; };

  render() {
    return (
      <Editor onChange={this.onChange} setRef={this.setRef} value={this.state.value} />
    );
  }
}
