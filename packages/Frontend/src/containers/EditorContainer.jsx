import React, { Component } from 'react';
import firebase from 'firebase';
import Editor from '../components/Editor';

export default class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.state = {
      loading: true,
      value: '',
    };
  }

  componentDidMount() {
    this.db.collection('editor').doc('test').get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ value: doc.data().value, loading: false }, () => {
            if (this.quill) {
              this.quill.focus();
              const editor = this.quill.getEditor();
              editor.setSelection(editor.getLength());
            }
          });
        } else {
          this.setState({ loading: false });
        }
      });
  }

  onChange = () => {}

  onChangeSelection = (range, source, editor) => {
    if (!this.state.loading) {
      const getRange = () => {
        if (range === null) {
          return range;
        }
        const { index, length } = range;
        return { index, length };
      };

      this.setState({ value: editor.getHTML(), range: getRange() }, () => {
        this.db.collection('editor').doc('test').update({
          value: this.state.value,
          range: this.state.range,
        })
          .catch(err => console.log('err writing value to firebase: ', err));
      });
    }
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
