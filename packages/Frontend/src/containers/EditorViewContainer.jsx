import React, { Component } from 'react';
import firebase from 'firebase';
import Editor from '../components/Editor';

export default class EditorViewContainer extends Component {
  constructor(props) {
    super(props);
    firebase
      .firestore()
      .collection('editor')
      .doc('test')
      .onSnapshot(this.handleSnapshot);
    this.state = {
      value: '',
    };
  }

  handleSnapshot = (doc) => {
    this.setState({ value: doc.data().value });
  }

  render() {
    return <Editor modules={{ toolbar: false }} readOnly value={this.state.value} />;
  }
}
