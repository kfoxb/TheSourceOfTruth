import React, { Component, Fragment } from 'react';
import { database } from 'firebase';
import { fromJS, List, Map } from 'immutable';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Add from '@material-ui/icons/Add';
import { Card, CardOutline } from 'somnium';
import { CREATE, DOCUMENTS, EDIT, PHASE, VIEW } from '@the-source-of-truth/shared/constants';
import Loading from '../components/Loading';

export default class TasksContainer extends Component {
  static createDocumentLinks(doc) {
    const title = doc.get('title');
    const phase = doc.get(PHASE);
    const id = doc.get('id');
    const viewHref = `/${DOCUMENTS}/${VIEW}/${id}`;
    const editHref = `/${DOCUMENTS}/${phase}/${id}`;
    return (
      <div key={id} >
        <Link to={viewHref} href={viewHref} >
          <Card title={title || 'Untitled'} />
        </Link>
        <Link to={editHref} href={editHref}>
          {'    (continue)'}
        </Link>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      documents: fromJS({
        [CREATE]: [],
        [EDIT]: [],
      }),
    };
  }

  componentDidMount() {
    this.ref = database()
      .ref(DOCUMENTS);
    this.setListenerByPhase(CREATE);
    this.setListenerByPhase(EDIT);
  }

  componentWillUnmount() {
    this.ref.off();
  }

  setListenerByPhase(phase) {
    this.ref
      .orderByChild(PHASE)
      .equalTo(phase)
      .on('value', this.handleSnapshot(phase), this.handleError);
  }

  handleError = (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  handleSnapshot = phase => (snapshot) => {
    if (this.state.loading) {
      this.setState({ loading: false });
    }
    const data = snapshot.val();

    const documents = Object.keys(data)
      .reduce((cur, acc) => cur.push(new Map({ id: acc, ...data[acc] })), new List([]));

    this.setState({ documents: this.state.documents.set(phase, documents) });
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }
    return (
      <Fragment>
        <h2>Tasks</h2>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <h3>Create</h3>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CardOutline>
              <Button><a href={`/${DOCUMENTS}/create`}><Add style={{ margin: 'auto' }} />Create</a></Button>
            </CardOutline>
            { this.state.documents.get(CREATE).map(TasksContainer.createDocumentLinks) }
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <h3>Edit</h3>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            { this.state.documents.get(EDIT).map(TasksContainer.createDocumentLinks) }
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Fragment>
    );
  }
}
