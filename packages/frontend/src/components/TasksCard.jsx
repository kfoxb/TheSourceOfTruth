import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { DOCUMENTS, PHASE, VIEW } from '@the-source-of-truth/shared/constants';

const styles = {
  card: {
    width: 240,
    height: 265,
    margin: 10,
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

export default withStyles(styles)(TasksCard);
