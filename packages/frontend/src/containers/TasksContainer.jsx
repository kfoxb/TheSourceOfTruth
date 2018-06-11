import React, { Component, Fragment } from 'react';
import { database } from 'firebase';
import { fromJS, List, Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Add from '@material-ui/icons/Add';
import { CREATE, DOCUMENTS, EDIT, PHASE } from '@the-source-of-truth/shared/constants';
import Loading from '../components/Loading';
import TasksCard from '../components/TasksCard';

const styles = {
  root: {
    flexWrap: 'wrap',
  },
};

class TasksContainer extends Component {
  static createDocumentLinks(doc) {
    const id = doc.get('id');
    return (
      <TasksCard doc={doc} id={id} key={id} />
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
        <ExpansionPanel className={this.props.classes.root}>
          <ExpansionPanelSummary className={this.props.classes.root} expandIcon={<ExpandMoreIcon />}>
            <h3>New Publications (Creations)</h3>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={this.props.classes.root}>
            <Card>
              <Button><a href={`/${DOCUMENTS}/create`}><Add style={{ margin: 'auto' }} />Create</a></Button>
            </Card>
            {this.state.documents.get(CREATE).map(TasksContainer.createDocumentLinks)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <h3>Publications in Progress (Editing)</h3>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {this.state.documents.get(EDIT).map(TasksContainer.createDocumentLinks)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Fragment>
    );
  }
}

export default withStyles(styles)(TasksContainer);
