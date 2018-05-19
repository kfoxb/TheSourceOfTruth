import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import Firepad from '../components/Firepad';
import { getCollection, getDocumentId } from '../helpers/firestore';

global.CodeMirror = CodeMirror;
const { fromCodeMirror } = require('firepad/dist/firepad');


export default class FirepadContainer extends Component {
  static propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
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
      collection: getCollection(props.match.url),
      documentId: getDocumentId(props.match.params.id),
      title: '',
    };
    this.setRef();
    this.ref.on('value', (snapshot) => {
      this.setState({ title: snapshot.val().title });
    });
  }

  componentDidMount() {
    const cm = CodeMirror(document.getElementById('firepad-container'), {
      lineWrapping: true,
    });
    const firepad = fromCodeMirror(
      this.ref, cm,
      { richTextToolbar: true, richTextShortcuts: true },
    );
    firepad.on('ready', () => {});
  }

  setRef() {
    const collectionRef = firebase.database().ref(this.state.collection);
    if (this.state.documentId) {
      this.ref = collectionRef.child(this.state.documentId);
    } else {
      const docRef = collectionRef.push();
      this.props.history.replace(`/${this.state.collection}/edit/${docRef.key}`);
      this.ref = docRef;
    }
  }

  handleTitleChange = ({ target: { value } }) => {
    const newTitle = { title: value };
    this.setState(newTitle, () => {
      this.ref.update(newTitle);
    });
  }

  render() {
    return (
      <Firepad
        title={this.state.title}
        handleTitleChange={this.handleTitleChange}
      />
    );
  }
}
