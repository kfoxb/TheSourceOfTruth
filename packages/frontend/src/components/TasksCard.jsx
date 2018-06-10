import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { DOCUMENTS, PHASE, VIEW } from '@the-source-of-truth/shared/constants';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  media: {
    backgroundColor: 'grey',
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function TasksCard({ doc, classes }) {
  const title = doc.get('title');
  const phase = doc.get(PHASE);
  const id = doc.get('id');
  const viewHref = `/${DOCUMENTS}/${VIEW}/${id}`;
  const editHref = `/${DOCUMENTS}/${phase}/${id}`;
  return (
    <div key={id} >
      <Card className={classes.card}>
        <CardMedia className={classes.media} />
        <Link to={viewHref} href={viewHref} >
          {title || 'Untitled'}
        </Link>
      </Card>
      <Link to={editHref} href={editHref}>
        {'    (continue)'}
      </Link>
    </div>
  );
}

TasksCard.propTypes = {
  classes: PropTypes.shape({
    card: PropTypes.string.isRequired,
    media: PropTypes.string,
  }).isRequired,
};

TasksCard.defaultProps = {
  media: undefined,
};

export default withStyles(styles)(TasksCard);
