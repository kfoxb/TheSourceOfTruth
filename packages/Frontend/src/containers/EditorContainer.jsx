import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header } from 'somnium';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'firepad/dist/firepad.css';
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
    this.ref = this.getExampleRef(this.state.collection, this.state.documentId);
  }

  componentDidMount() {
    // // Create CodeMirror (with lineWrapping on).
    const firepad = Firepad.fromCodeMirror(
      this.ref, document.getElementById('firepad-container'),
      { richTextToolbar: true, richTextShortcuts: true },
    );
    firepad.on('ready', () => {});
  }

  setRef = (ref) => { this.quill = ref; };

  getExampleRef = (collection, id) => {
    let ref = firebase.database().ref(collection);
    if (id) {
      ref = ref.child(id);
    } else {
      ref = ref.push(); // generate unique location.
      this.props.history.replace(`/${this.state.collection}/edit/${ref.key}`);
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
