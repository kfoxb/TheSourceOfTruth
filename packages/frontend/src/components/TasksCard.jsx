import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { database } from 'firebase';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import truncate from 'lodash/truncate';
import words from 'lodash/words';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { CREATE, DATE, DOCUMENTS, EDIT, ENG, PHASE, VIEW } from '@the-source-of-truth/shared/constants';
import { checkPermissions } from '@the-source-of-truth/shared/helpers';
import CodeMirror from 'codemirror';
import format from 'date-fns/format';
import colors from '../constants/colors';

global.CodeMirror = CodeMirror;
const { Headless } = require('firepad/dist/firepad');

const StyledP = styled.p`
  color: ${colors.darkGrey};
  display: inline-block;
  opacity: 0.5;
`;

class TasksCard extends Component {
  constructor(props) {
    super(props);
    this.ref = database().ref(DOCUMENTS).child(props.id);
    this.state = {
      documentBody: '',
    };
  }

  componentDidMount() {
    this.headless = new Headless(this.ref);
    this.ref.on('value', () => {
      this.headless.getText((text) => {
        this.setState({ documentBody: text });
      });
    });
  }

  componentWillUnmount() {
    this.ref.off();
    this.headless.dispose();
  }

  getReadTime() {
    const minutesOfReading = Math.floor(words(this.state.documentBody).length / 250);
    return minutesOfReading > 0 ? minutesOfReading : '< 1';
  }

  render() {
    const {
      doc, history, id, claims,
    } = this.props;
    const title = doc.get('title') || '';
    const phase = doc.get(PHASE);
    const viewHref = `/${ENG}/${DOCUMENTS}/${VIEW}/${id}`;
    const editHref = `/${ENG}/${DOCUMENTS}/${phase}/${id}`;
    const hasPermissions = checkPermissions(claims, phase);
    const date = doc.get(DATE);
    const TooltipPhase = () => {
      if (phase === CREATE) {
        return 'Continue creating';
      } else if (phase === EDIT) {
        return 'Continue editing';
      }
      return 'Approve';
    };

    return (
      <div key={id} >
        <Card>
          <Tooltip id="tooltip-icon" title="View Document">
            <Button
              onClick={() => { history.push(viewHref); }}
              style={{
                height: '100%',
                padding: '0',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <CardContent style={{ color: `${colors.darkGrey}` }}>
                <h4 style={{ fontSize: '16px' }}>{ truncate(title, { length: 90 }) || 'Untitled'}</h4>
                <p>{truncate(this.state.documentBody, { length: 170 })}</p>
              </CardContent>
            </Button>
          </Tooltip>
          <Divider />
          <CardActions
            style={{
              display: 'grid',
              gridTemplateColumns: '0.75fr 1fr 0.5fr',
            }}
          >
            <StyledP>{format(date, 'M/D/YY')}</StyledP>
            <StyledP>{this.getReadTime()} min read</StyledP>
            { hasPermissions &&
              <Tooltip id="tooltip-icon" title={TooltipPhase()}>
                <IconButton
                  onClick={() => { history.push(editHref); }}
                  style={{
                    color: `${colors.darkGrey}`,
                    height: '35px',
                    width: '35px',
                    justifySelf: 'end',
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
            }
          </CardActions>
        </Card>
      </div>
    );
  }
}

TasksCard.propTypes = {
  claims: PropTypes.shape({
    editor: PropTypes.bool,
    author: PropTypes.bool,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  doc: ImmutablePropTypes.mapContains({
    title: PropTypes.string,
    phase: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(TasksCard);
