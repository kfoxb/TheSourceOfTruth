import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import Editor from '../components/Editor';

export default class EditorContainer extends Component {
  static getCollection = (url) => {
    if (url.includes('journal')) {
      return 'journals';
    }
    return '';
  }

  static getDocumentId = (id) => {
    if (id === 'create') {
      return '';
    }
    return id;
  }

  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.state = {
      collection: EditorContainer.getCollection(props.match.url),
      documentId: EditorContainer.getDocumentId(props.match.params.id),
      loading: true,
      title: '',
      value: '',
    };
  }

  componentDidMount() {
    if (!this.state.documentId) {
      // create a new document in firebase
    } else {
      this.db.collection(this.state.collection).doc(this.state.documentId).get()
        .then((doc) => {
          if (doc.exists) {
            const { title, value } = doc.data();
            this.setState({
              loading: false,
              title,
              value,
            }, () => {
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
  }


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
        this.updateDb({
          value: this.state.value,
          range: this.state.range,
        });
      });
    }
  }

  setRef = (ref) => { this.quill = ref; };

  updateDb = (value) => {
    this.db.collection(this.state.collection).doc(this.state.documentId).update(value)
      .catch(err => console.log('err writing value to firebase: ', err));
  }

  handleTitleChange = ({ target: { value } }) => {
    const update = { title: value };
    this.setState(update, () => {
      this.updateDb(update);
    });
  }

  render() {
    return (
      <Fragment>
        <input onChange={this.handleTitleChange} value={this.state.title} />
        <Editor
          onChangeSelection={this.onChangeSelection}
          setRef={this.setRef}
          value={this.state.value}
        />
      </Fragment>
    );
  }
}
