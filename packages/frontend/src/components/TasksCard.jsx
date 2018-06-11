import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Edit from '@material-ui/icons/Edit';
import { DOCUMENTS, PHASE, VIEW } from '@the-source-of-truth/shared/constants';
import colors from '../constants/colors';

const styles = {
  card: {
    maxheight: 265,
    maxwidth: 240,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

function TasksCard({ doc, classes, id }) {
  const title = doc.get('title');
  const phase = doc.get(PHASE);
  const viewHref = `/${DOCUMENTS}/${VIEW}/${id}`;
  const editHref = `/${DOCUMENTS}/${phase}/${id}`;
  return (
    <div key={id} >
      <Card className={classes.card}>
        <CardMedia className={classes.media} image="https://firebasestorage.googleapis.com/v0/b/thesourceoftruth-28554.appspot.com/o/placeholder.png?alt=media&token=1c1086cd-757f-4b09-b439-772eeed00f68" />
        <CardContent>
          <Link to={viewHref} href={viewHref} style={{ color: `${colors.darkGrey}` }}>
            {title || 'Untitled'}
          </Link>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Link to={editHref} href={editHref} style={{ color: `${colors.darkGrey}` }}>
            <Edit />
          </Link>
        </CardActions>
      </Card>
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
