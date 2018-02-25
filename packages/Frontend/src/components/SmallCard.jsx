import React, { Component } from 'react';
import { Divider, Header, Icon, Image, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SpaceHead from './assets/SpaceHead.jpg';

export default class SmallCard extends Component {
  static propTypes = { header: PropTypes.string.isRequired }
  constructor(props) {
    super(props);
    this.state = { height: 150 };
  }
  componentDidMount() {
    window.addEventListener('resize', this.measureHeight);
    this.measureHeight();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.measureHeight);
  }
  measureHeight = () => {
    this.setState({ height: this.ref.clientHeight });
  }
  render() {
    return (
      <div ref={(ref) => { this.ref = ref; }}>
        <Segment size='mini'>
          <Image
            height={this.state.height}
            width={137}
            src={SpaceHead}
            style={{
              objectFit: 'cover',
              position: 'absolute',
              top: -1,
              left: -1,
            }}
          />
          <div
            style={{
              left: 142,
              marginRight: 137,
              position: 'relative',
              top: 0,
            }}
          >
            <Header size="medium">{this.props.header}</Header>
            <p >{this.props.body}... <a>Read more.</a> </p>
            <Divider />
            <p style={{ display: 'inline-block' }} >Feb. 22, 2018</p>
            <p
              style={{
                display: 'inline-block',
                float: 'right',
              }}
            >
              <Icon name="file text outline" />
              20 Minute Read
            </p>
          </div>
        </Segment>
      </div>
    );
  }
}
