import React from 'react';
import { Divider, Header, Icon, Image, Segment } from 'semantic-ui-react';
import SpaceHead from './assets/SpaceHead.jpg';

const SmallCard = () => (
  <Segment>
    <Image
      src={SpaceHead}
      style={{
        position: 'absolute',
        width: 150,
      }}
    />
    <div
      style={{
        position: 'relative',
        top: 0,
        left: 175,
      }}
    >
      <Header size="medium">BIRTH: understanding light and darkness, becoming conscious inside a dream in a new world patterned after our real one.</Header>
      What really happens when we are born into this world? What do we consciously... Read more.
      <Divider />
      <Icon name="file text outline" />
      20 Minute Read
    </div>
  </Segment>
);

export default SmallCard;
