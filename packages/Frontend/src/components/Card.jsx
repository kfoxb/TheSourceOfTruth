import React from 'react';
import PropTypes from 'prop-types';
import { Card as SCard, Icon, Image } from 'semantic-ui-react';

export default function Card(props) {
  return (
    <div style={{ position: 'relative', display: 'inline' }}>
      <SCard>
        <Icon
          name="star"
          onClick={props.toggleFav}
          size="huge"
          style={{
            color: props.starFilled ? 'yellow' : 'whitesmoke',
            position: 'absolute',
            zIndex: 1,
            right: 0,
            top: 9,
          }}
        />
        <Image />
        <SCard.Content>
          <SCard.Header>
            Title
          </SCard.Header>
        </SCard.Content>
        <SCard.Content extra>
          <p>
            <Icon name="file text outline" />
              Read Time
          </p>
        </SCard.Content>
      </SCard>
    </div>
  );
}

Card.propTypes = {
  toggleFav: PropTypes.func.isRequired,
  starFilled: PropTypes.bool.isRequired,
};
