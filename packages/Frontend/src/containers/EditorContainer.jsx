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

  onChangeSelection = (range, source, editor) => {
    console.log('this is range', range);
    console.log('this is source', source);
    console.log('this is editor', editor);
  }

  setRef = (ref) => { this.quill = ref; };

  render() {
    return (
      <Editor
        onChange={this.onChange}
        onChangeSelection={this.onChangeSelection}
        setRef={this.setRef}
        value={this.state.value}
      />
    );
  }
}
