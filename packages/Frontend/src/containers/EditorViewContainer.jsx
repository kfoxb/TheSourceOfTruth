import React, { Component } from 'react';
import firebase from 'firebase';
import QuillCursors from 'quill-cursors';
import { Quill } from 'react-quill';
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
      range: { index: 0, length: 0 },
    };
  }

  componentDidMount() {
    if (this.quill) {
      Quill.register('modules/cursors', QuillCursors);
      this.quill.getEditor().getModule('cursors').setCursor(
        1,
        this.state.range,
        'bill',
        'red',
      );
      console.log('editor', this.quill.getEditor().getModule('cursors').setCursor);
    }
  }

  setRef= (ref) => { this.quill = ref; };

  handleSnapshot = (doc) => {
    const data = doc.data();
    this.setState({
      value: data.value,
      range: JSON.parse(data.range),
    }, () => {
      this.quill.getEditor().getModule('cursors').moveCursor(1, this.state.range);
      console.log('cursors here', this.quill.getEditor().getModule('cursors'));
    });
  }

  render() {
    return (
      <Editor
        modules={{
          toolbar: false,
          cursors: true,
        }}
        readOnly
        setRef={this.setRef}
        value={this.state.value}
      />
    );
  }
}
