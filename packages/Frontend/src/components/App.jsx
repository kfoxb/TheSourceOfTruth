import React, { Fragment, Component } from 'react';
import { Button } from 'semantic-ui-react';
import SidebarLeftOverlay from './SidebarLeftOverlay';
import SidebarTopOverlay from './SidebarTopOverlay';

export default class App extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    return (
      <Fragment>
        <SidebarTopOverlay toggleMenu={this.toggleVisibility} />
        <SidebarLeftOverlay
          sideBarVisibility={this.state.visible}
          toggleMenu={this.toggleVisibility}
        />
        <Button>Real Truth</Button>
      </Fragment>
    );
  }
}
