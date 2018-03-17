import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Divider, Header, Icon, Image, Segment } from 'semantic-ui-react';
import Placeholder from './assets/Placeholder.png';

const StyledSegment = styled(Segment)`
  @media (min-width: 600px) {
    height: 400px;
    width: 300px;
  }
  @media (max-width: 600px) {
    height: 150px;
  }
`;

const StyledDiv = styled.div`
  @media (max-width: 600px) {
    margin-left: 142px;
    margin-right: 17px;
    position: absolute;
    top: 40px;
    margin-right: 10%;
  }
`;
const StyledImage = styled(Image)`
  object-fit: cover;

  @media (max-width: 600px) {
    position: absolute;
    top: -14px;
    left: -14px;
    width: 137px;
    height: 150px;
  }
`;

export default function Card(props) {
  return (
    <StyledSegment>
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
      <StyledImage src={Placeholder} />
      <StyledDiv>
        <p>
          <Header>
            Title
          </Header>
          Short description goes here.
        </p>
        <Divider />
        <p style={{ display: 'inline-block' }} >
          <Icon name="file text outline" />
          Read Time
        </p>
        <p style={{ display: 'inline-block', float: 'right' }}>
          06/16/18
        </p>
      </StyledDiv>
    </StyledSegment>
  );
}

Card.propTypes = {
  toggleFav: PropTypes.func.isRequired,
  starFilled: PropTypes.bool.isRequired,
};
