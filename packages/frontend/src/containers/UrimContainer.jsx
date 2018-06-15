import React, { Component } from 'react';
import Quill from 'quill';
import firebase, { database } from 'firebase';
import PropTypes from 'prop-types';
import { CREATE, DELETED, DOCUMENTS, ENG, PHASE, PRIMARY, VIEW } from '@the-source-of-truth/shared/constants';
import { connect } from 'react-redux';
import 'quill/dist/quill.snow.css';
import Editor from '../components/Editor';

window.Quill = Quill;
window.firebase = firebase;
const { fromQuill } = require('urim/dist/firepad');

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],

  ['link', 'image'],

  [{ font: [] }],
  ['clean'],
];

const docPath = `${ENG}/${DOCUMENTS}`;
class UrimContainer extends Component {
  static propTypes = {
    claims: PropTypes.shape({
      author: PropTypes.bool,
      editor: PropTypes.bool,
      approver: PropTypes.bool,
    }),
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
      params: PropTypes.shape({
        id: PropTypes.string,
        phase: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  static defaultProps = {
    claims: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      notFound: false,
      [PHASE]: '',
      taskComplete: false,
      taskInProgress: false,
      title: '',
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.init();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isAuthenticated && this.props.isAuthenticated) {
      this.init();
    }
  }

  componentWillUnmount() {
    this.ref.off();
  }

  getOrCreateUrimDocument() {
    const { phase, id } = this.props.match.params;
    if (phase === CREATE && !id) {
      return this.createUrimDocument();
    }
    this.primaryRef = database().ref(`${docPath}/${PRIMARY}/${id}`);
    this.ref = database().ref(`${docPath}/${phase}/${id}`);
    return Promise.resolve();
  }

  createUrimDocument() {
    this.primaryRef = database().ref(`${docPath}/${PRIMARY}`).push();
    this.ref = database().ref(`${docPath}/${CREATE}/${this.primaryRef.key}`);
    const data = {
      date: database.ServerValue.TIMESTAMP,
      locked: false,
      title: '',
    };
    const primaryData = {
      ...data,
      categories: {},
      description: '',
      image: '',
      phase: CREATE,
      pinned: false,
      readTime: 0,
    };
    return Promise.all([
      this.ref.update(data),
      this.primaryRef.update(primaryData),
    ])
      .then(() => {
        this.props.history.replace(`/${DOCUMENTS}/${CREATE}/${this.ref.key}`);
      })
      .catch(this.handleError);
  }

  listenForDocChanges() {
    this.primaryRef.on('value', this.handleSnapshot, this.handleError);
  }

  handleError = (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    this.setState({ error });
  }

  handleSnapshot = (snapshot) => {
    const data = snapshot.val();
    if (data !== null) {
      const { phase, title } = data;
      if (this.verifyPhase(phase)) {
        if (!this.state.urimInitialized) {
          this.setState({ urimInitialized: true }, this.initUrim);
        }
      }
      this.setState({
        phase,
        title,
      });
    } else {
      this.setState({ notFound: true });
    }
  }

  init() {
    this.getOrCreateUrimDocument()
      .then(() => {
        this.listenForDocChanges();
      });
  }

  verifyPhase(dbPhase) {
    const { phase } = this.props.match.params;
    if ((phase === VIEW && dbPhase !== DELETED) || phase === dbPhase) {
      return true;
    }
    this.setState({
      error: {
        message: `You are trying to ${phase} a document,
            but it's currently in the ${dbPhase} phase`,
        code: 'phase-mismatch',
      },
    });
    return false;
  }

  initUrim() {
    const readOnly = this.isReadOnly();
    const editor = new Quill('#editor-container', {
      modules: {
        toolbar: readOnly ? !readOnly : toolbarOptions,
      },
      theme: 'snow',
      readOnly,
    });
    this.urimInst = fromQuill(this.ref, editor, null);
    this.urimInst.on('ready', () => {
      this.setState({
        loading: false,
      });
    });
  }

  isReadOnly = () => this.props.match.params.phase === VIEW

  handleTitleChange = ({ target: { value } }) => {
    const newTitle = { title: value };
    this.setState(newTitle, () => {
      this.ref.update(newTitle)
        .catch(this.handleError);
    });
  }

  handleTask = type => () => {
    this.setState({ taskInProgress: true }, () => {
      this.ref.off();
      Promise.all([
        database()
          .ref('tasks').push({
            type,
            payload: {
              id: this.ref.key,
            },
          }),
      ])
        .then(() => {
          this.setState({
            taskInProgress: false,
            taskComplete: true,
          });
        })
        .catch(this.handleError);
    });
  }

  render() {
    const loading = !this.props.isAuthenticated || this.state.loading;
    return (
      <Editor
        claims={this.props.claims}
        elementId="editor-container"
        error={this.state.error}
        firepadInst={this.firepadInst}
        handleTask={this.handleTask}
        handleTitleChange={this.handleTitleChange}
        loading={loading}
        notFound={this.state.notFound}
        phase={this.state.phase}
        readOnly={this.isReadOnly()}
        taskInProgress={this.state.taskInProgress}
        taskComplete={this.state.taskComplete}
        title={this.state.title}
      />
    );
  }
}

const mapStateToProps = state => ({
  claims: state.user.claims,
  isAuthenticated: state.user.isAuthenticated,
  uid: state.user.uid,
});

export default connect(mapStateToProps)(UrimContainer);
