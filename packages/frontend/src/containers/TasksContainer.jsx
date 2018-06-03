import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import { List, Map } from 'immutable';
import { Link } from 'react-router-dom';
import { DOCUMENTS } from '@the-source-of-truth/shared/constants';
import Loading from '../components/Loading';

export default class TasksContainer extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.state = {
      loading: true,
      journals: new List([]),
    };
  }

  componentDidMount() {
    this.db.collection('journals')
      .get()
      .then(querySnapshot =>
        querySnapshot.docs.reduce((journals, journal) =>
          journals.push(new Map({ id: journal.id, ...journal.data() })), new List([])))
      .then(journals => this.setState({ journals, loading: false }));
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }
    return (
      <Fragment>
        <button><a href={`/${DOCUMENTS}/create`}>Create Journal</a></button>
        { this.state.journals.map((journal) => {
          const viewHref = `/journals/view/${journal.get('id')}`;
          const editHref = `/journals/edit/${journal.get('id')}`;
          return (
            <div key={journal.get('id')} >
              <Link
                to={viewHref}
                href={viewHref}
              >
                {journal.get('title')}
              </Link>
              <Link
                to={editHref}
                href={editHref}
              >
                (edit)
              </Link>
            </div>
          );
        })}
      </Fragment>
    );
  }
}
