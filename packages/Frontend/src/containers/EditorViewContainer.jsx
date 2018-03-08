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
        'blue',
      );
    }
  }

  setRef= (ref) => { this.quill = ref; };

  handleSnapshot = (doc) => {
    const data = doc.data();
    this.setState({
      value: data.value,
      range: data.range,
    }, () => {
      const cursors = this.quill.getEditor().getModule('cursors');
      if (this.state.range) {
        cursors.moveCursor(1, this.state.range);
      } else {
        cursors.removeCursor(1);
      }
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
