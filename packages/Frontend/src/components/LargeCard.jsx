import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import SealedPortion from './assets/SealedPortion.jpg';


export default class LargeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starFilled: false,
    };
  }
  toggleFav = () => this.setState({ starFilled: !this.state.starFilled })
  render() {
    const { starFilled } = this.state;
    return (
      <div style={{ position: 'relative', display: 'inline' }}>
        <Card>
          <Icon
            name="star"
            onClick={starFilled}
            size="huge"
            style={{
              position: 'absolute',
              zIndex: 1,
              right: 0,
              top: 9,
            }}
          />
          <Image src={SealedPortion} />
          <Card.Content>
            <Card.Header>
              The Sealed Portion
            </Card.Header>
          </Card.Content>
          <Card.Content extra>
            <p>
              <Icon name="file text outline" />
              22 hr read
            </p>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
