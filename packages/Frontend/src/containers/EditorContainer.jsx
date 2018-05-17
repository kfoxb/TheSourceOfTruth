import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { Header } from 'somnium';
import ContentBody from '../components/ContentBody';
import { getCollection, getDocumentId } from '../helpers/firestore';


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
    const codeMirror = CodeMirror(document.getElementById('firepad-container'), { lineWrapping: true });
    // // Create Firepad (with rich text toolbar and shortcuts enabled).
    const firepad = Firepad.fromCodeMirror(
      firepadRef, codeMirror,
      { richTextToolbar: true, richTextShortcuts: true },
    );
    firepad.on('ready', () => {
      if (firepad.isHistoryEmpty()) {
        firepad.setHtml('<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/>\n' +
              '<br/>' +
              '<div style="font-size: 18px">' +
              'Supports:<br/>' +
              '<ul>' +
                '<li>Different ' +
                  '<span style="font-family: impact">fonts,</span>' +
                  '<span style="font-size: 24px;"> sizes, </span>' +
                  '<span style="color: blue">and colors.</span>' +
                '</li>' +
                '<li>' +
                  '<b>Bold, </b>' +
                  '<i>italic, </i>' +
                  '<u>and underline.</u>' +
                '</li>' +
                '<li>Lists' +
                  '<ol>' +
                    '<li>One</li>' +
                    '<li>Two</li>' +
                  '</ol>' +
                '</li>' +
                '<li>Undo / redo</li>' +
                '<li>Cursor / selection synchronization.</li>' +
                '<li><checkbox></checkbox> It supports customized entities.</li>' +
                '<li>And it\'s all fully collaborative!</li>' +
              '</ul>' +
              '</div>');
      }
    });
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
          <div style={{ width: '100%', height: '100%' }} id="firepad-container" />
        </ContentBody>
      </div>
    );
  }
}
