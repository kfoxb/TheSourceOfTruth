import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../constants/colors';

const StyledBody = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${colors.white};

  @media(max-width: 600px) {
    grid-gap: 10px;
    grid-template-rows: 50px 25px 455px;
  }

  @media(min-width: 600px) and (max-width: 950px) {
    grid-gap: 10px;
    grid-template-rows: 50px 40px 600px;
  }

  @media(min-width: 950px) {
    grid-gap: 10px;
    grid-template-rows: 50px 40px 600px;
  }
`;

export default function TaskContentBody(props) {
  return (
    <StyledBody>
      { props.children }
    </StyledBody>
  );
}

TaskContentBody.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
