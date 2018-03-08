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

  onChange = (value) => {
    this.db.collection('editor').doc('test').update({
      value,
    })
      .catch(err => console.log('err writing value to firebase: ', err));
    this.setState({ value });
  }

  onChangeSelection = (range) => {
    console.log('this is range', range);
    this.db.collection('editor').doc('test').update({
      range: JSON.stringify(range),
    })
      .catch(err => console.log('err writing range to firebase: ', err));
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
