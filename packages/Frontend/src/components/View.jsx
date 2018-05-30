import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../constants/colors';

const StyledDiv = styled.div`
  background-color: ${colors.white};
  top: 0;
  bottom: 0;
  height: 100vh;
  display: grid;
  @media(min-width: 600px) {
    grid-template-columns: 1fr 5fr 1fr;
  }
  .sides {
    background-color: ${colors.grey};
    box-shadow: inset 0 0 0 0.75pt #d1d1d1, inset 0 0 12pt 0.75pt #ccc;
  }
  .content {
    padding: 20px;
  }
`;

export default function View(props) {
  return (
    <StyledDiv>
      { props.children }
    </StyledDiv>
  );
}

View.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
