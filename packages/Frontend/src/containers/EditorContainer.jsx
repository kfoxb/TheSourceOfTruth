import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import Editor from '../components/Editor';

firebase.initializeApp({
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
});

const db = firebase.firestore();

export default class EditorContainer extends Component {
  constructor(props) {
    super(props);
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
    db.collection('editor').doc('test').set({
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
