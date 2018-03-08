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
    const data = doc.data();
    console.log('data', data);
    this.setState({
      value: data.value,
      range: JSON.parse(data.range),
    });
  }

  render() {
    return <Editor modules={{ toolbar: false }} readOnly value={this.state.value} />;
  }
}
