import React, { Fragment, Component } from 'react';
import { Route } from 'react-router-dom';
import { Search, Sidebar, Button, Segment, Menu, Icon } from 'semantic-ui-react';
import ProtectedRoute from '../containers/ProtectedRoute';
import Login from './Login';
import Nav from './Nav';
import mwaw from './Media/mwaw.png';
import SidebarLeftOverlay from './sideMenu';

export default function App() {
  return (
    <Fragment>
      <SidebarTopOverlay />
      <SidebarLeftOverlay />
      <Button>Real Truth</Button>
      <Route path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Nav} />
    </Fragment>
  );
}

class SidebarTopOverlay extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="overlay" direction="top" visible={visible} inverted>
            <Menu.Item name="Menu" onClick={this.toggleVisibility}>
              <Icon name="content" />
            </Menu.Item>
            <Menu.Item name="Language">
              <Icon name="flag" />
              Language
            </Menu.Item>
            <Menu.Item name="Settings">
              <Icon name="setting" />
            </Menu.Item>
            <Menu.Item name="Sign in">
              <Icon name="user" />
            </Menu.Item>
            <Search />
          </Sidebar>
          <Sidebar.Pusher>
            <img onMouseEnter={this.toggleVisibility} alt="" src={mwaw} style={{ width: '100%' }} />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
