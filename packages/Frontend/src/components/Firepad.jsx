import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'somnium';
import styled from 'styled-components';
import 'codemirror/lib/codemirror.css';
import 'firepad/dist/firepad.css';
import ContentBody from './ContentBody';

const StyledFirepad = styled.div`
  height: '100%';
  width: '100%';
  .firepad {
    border: 1px solid #DCDCDC;
  }
  .firepad-btn {
    border: 0;
    color: #3d4347;
    &:hover {
    background-color: grey;
    }
  }
  .powered-by-firepad {
    display: none;
  }
`;

export default function Firepad({ handleTitleChange, title }) {
  return (
    <div>
      <Header headerTitle="Add New Post" />
      <ContentBody>
        <input
          onChange={handleTitleChange}
          style={{ width: '100%' }}
          placeholder="Add New Title Here"
          value={title}
        />
        <StyledFirepad id="firepad-container" />
      </ContentBody>
    </div>
  );
}

Firepad.propTypes = {
  handleTitleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
