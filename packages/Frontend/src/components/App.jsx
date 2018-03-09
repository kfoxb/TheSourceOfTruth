import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Quill } from 'react-quill';
import QuillCursors from 'quill-cursors';
import PropTypes from 'prop-types';
import { SidebarLeftOverlay, SidebarTopOverlay } from './Navigation';
import Home from './Home';
import Journal from './Journal';
import NewJournal from './NewJournal';
import Library from './Library';
import AuthenticateContainer from '../containers/AuthenticateContainer';


Quill.register('modules/cursors', QuillCursors);
function App({
  isAuthenticated, logout, toggleVisibility, visible,
}) {
  return (
    <Fragment>
      <SidebarTopOverlay toggleMenu={toggleVisibility} />
      <SidebarLeftOverlay
        isAuthenticated={isAuthenticated}
        logout={logout}
        sideBarVisibility={visible}
        toggleMenu={toggleVisibility}
      />
      <div style={{ height: '40px' }} />
      <Route exact path="/" component={Home} />
      <Route path="/journal" component={Journal} />
      <Route path="/newJournal" component={NewJournal} />
      <Route path="/library" component={Library} />
      <Route path="/sign(up|in)" component={AuthenticateContainer} />
    </Fragment>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default withRouter(App);
