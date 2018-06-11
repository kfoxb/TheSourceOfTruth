import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { truncate } from 'lodash';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Edit from '@material-ui/icons/Edit';
import { DOCUMENTS, PHASE, VIEW } from '@the-source-of-truth/shared/constants';
import colors from '../constants/colors';

const styles = {
  card: {
    maxheight: 265,
    maxwidth: 240,
  },
};

function TasksCard({ doc, classes, id }) {
  const title = doc.get('title');
  const phase = doc.get(PHASE);
  const viewHref = `/${DOCUMENTS}/${VIEW}/${id}`;
  const editHref = `/${DOCUMENTS}/${phase}/${id}`;
  const desc = '';
  return (
    <div key={id} >
      <Link to={viewHref} href={viewHref}>
        <Card className={classes.card}>
          <CardContent style={{ color: `${colors.darkGrey}` }}>
            <h4 style={{ fontSize: '18px' }}>{ truncate(title, { length: 80 }) || 'Untitled'}</h4>
            <p>{truncate(desc, { length: 170 })}</p>
          </CardContent>
          <Divider />
          <CardActions style={{ justifyContent: 'flex-end' }}>
            <Link to={editHref} href={editHref} style={{ color: `${colors.darkGrey}` }}>
              <Edit />
            </Link>
          </CardActions>
        </Card>
      </Link>
    </div>
  );
}

TasksCard.propTypes = {
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
    media: PropTypes.string,
  }).isRequired,
  id: PropTypes.string.isRequired,
  doc: ImmutablePropTypes.mapContains({
    title: PropTypes.string.isRequired,
    phase: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(TasksCard);
