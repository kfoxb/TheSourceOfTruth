import React, { Component } from 'react';
import Quill from 'quill';
import { database } from 'firebase';
import PropTypes from 'prop-types';
import { CHANGING_PHASE, CREATE, DELETED, DOCUMENTS, PHASE, TIME, VIEW } from '@the-source-of-truth/shared/constants';
import { connect } from 'react-redux';
import 'quill/dist/quill.snow.css';
import Editor from '../components/Editor';

window.Quill = Quill;
const { fromQuill } = require('urim/dist/firepad');

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],

  ['link', 'image'],

  [{ font: [] }],
  ['clean'],
];

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
      [CHANGING_PHASE]: false,
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
    this.ref = database().ref(DOCUMENTS).child(id);
    this.listenForDocChanges();
    return Promise.resolve();
  }

  createUrimDocument() {
    this.ref = database().ref(DOCUMENTS).push();
    return Promise.all([
      this.ref.child(PHASE).set(CREATE),
      this.ref.child('title').set(''),
      this.ref.child(CHANGING_PHASE).set(false),
      this.ref.child(TIME).child(CREATE).set(database.ServerValue.TIMESTAMP),
      // add security rule for this
      this.ref.child('editor').set('urim'),
    ])
      .then(() => {
        this.props.history.replace(`/${DOCUMENTS}/${CREATE}/${this.ref.key}`);
        this.listenForDocChanges();
      })
      .catch(this.handleError);
  }

  listenForDocChanges() {
    this.ref.on('value', this.handleSnapshot, this.handleError);
  }

  handleError = (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    this.setState({ error });
  }

  handleSnapshot = (snapshot) => {
    const data = snapshot.val();
    if (data !== null) {
      const { changingPhase, phase, title } = data;
      if (this.verifyPhase(phase)) {
        if (!this.state.urimInitialized) {
          this.setState({ urimInitialized: true }, this.initUrim);
        }
      }
      this.setState({
        changingPhase,
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
        this.ref.update({
          [CHANGING_PHASE]: true,
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
        changingPhase={this.state.changingPhase}
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
