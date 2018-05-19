import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header } from 'somnium';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import ContentBody from '../components/ContentBody';
import { getCollection, getDocumentId } from '../helpers/firestore';

global.CodeMirror = CodeMirror;
const Firepad = require('firepad/dist/firepad');

const StyledFirepad = styled.div`
  height: '100%';
  width: '100%';
  .firepad {
    border: 1px solid #DCDCDC;
  }
  .firepad-btn {
    border: 0;
    color: #3d4347;
    &:hover {
    background-color: grey;
    }
  }
  .powered-by-firepad {
    display: none;
  }
`;

export default class EditorContainer extends Component {
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
      collection: getCollection(props.match.url),
      documentId: getDocumentId(props.match.params.id),
      loading: true,
      title: '',
      value: '',
    };
  }

  componentDidMount() {
    const firepadRef = this.getExampleRef();
    // // Create CodeMirror (with lineWrapping on).
    const firepad = Firepad.fromCodeMirror(
      firepadRef, document.getElementById('firepad-container'),
      { richTextToolbar: true, richTextShortcuts: true },
    );
    firepad.on('ready', () => {});
  }

  setRef = (ref) => { this.quill = ref; };

  getExampleRef = () => {
    let ref = firebase.database().ref();
    const hash = window.location.hash.replace(/#/g, '');
    if (hash) {
      ref = ref.child(hash);
    } else {
      ref = ref.push(); // generate unique location.
      window.location = `${window.location}#${ref.key}`; // add it as a hash to the URL.
    }
    if (typeof console !== 'undefined') {
      console.log('Firebase data: ', ref.toString());
    }
    return ref;
  };

  handleTitleChange = ({ target: { value } }) => {
    const update = { title: value };
    this.setState(update, () => {
      this.updateDb(update);
    });
  }

  render() {
    // if (this.state.loading) {
    //   return (<p>Loading...</p>);
    // }
    return (
      <div>
        <Header headerTitle="Add New Post" />
        <ContentBody>
          <input
            onChange={this.handleTitleChange}
            style={{ width: '100%' }}
            placeholder="Add New Title Here"
            value={this.state.title}
          />
          <StyledFirepad id="firepad-container" />
        </ContentBody>
      </div>
    );
  }
}
