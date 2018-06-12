import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { database } from 'firebase';
import { fromJS, List, Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
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
import colors from '../constants/colors';

const styles = {
  root: {
    display: 'grid',
    justifyContent: 'center',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fit, 250px)',
  },
  card: {
    maxheight: 265,
    maxwidth: 240,
  },
};

class TasksContainer extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      root: PropTypes.string.isRequired,
      card: PropTypes.string.isRequired,
    }).isRequired,
  }

  static createDocumentLinks(doc, claims) {
    const id = doc.get('id');
    return (
      <TasksCard claims={claims} doc={doc} id={id} key={id} />
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
            <h3>New Publications (Creations)</h3>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={this.props.classes.root}>
            <Card className={this.props.classes.card}>
              <Button
                style={{
                  height: '100%',
                  width: '100%',
                }}
              >
                <a href={`/${DOCUMENTS}/create`} style={{ color: `${colors.darkGrey}` }}>
                  <Add style={{ height: '100px', width: '100px' }} />
                </a>
              </Button>
            </Card>
            {this.state.documents.get(CREATE).map(doc =>
              TasksContainer.createDocumentLinks(doc, this.props.claims))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <h3>Publications in Progress (Editing)</h3>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={this.props.classes.root}>
            {this.state.documents.get(EDIT).map(doc =>
              TasksContainer.createDocumentLinks(doc, this.props.claims))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  claims: state.user.claims,
});

export default connect(mapStateToProps)(withStyles(styles)(TasksContainer));
