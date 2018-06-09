import React, { Component } from 'react';
import AppContainer from '../containers/AppContainer';

export default class ComingSoon extends Component {
  state = {
    count: 0,
  }
  render() {
    if (this.state.count >= 4) {
      return (<AppContainer />);
    }
    return (<div onClick={() => this.setState(prevState => ({ count: prevState.count + 1 }))}>Coming Soon</div>);
  }
}
