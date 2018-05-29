import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'codemirror/lib/codemirror.css';
import 'firepad/dist/firepad.css';
import Button from '@material-ui/core/Button';
import TaskContentBody from './TaskContentBody';
import TaskHeader from './TaskHeader';

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

export default function Firepad({
  handleTitleChange,
  handleSubmit,
  readOnly,
  title,
}) {
  return (
    <div>
      <TaskContentBody>
        <TaskHeader>
          <div>Add New Post</div>
          <Button onClick={handleSubmit} className="buttons">Submit</Button>
        </TaskHeader>
        { readOnly ?
            (<h1>{title}</h1>) :
            <input
              onChange={handleTitleChange}
              style={{ width: '100%' }}
              placeholder="Add New Title Here"
              value={title}
            />
        }
        <StyledFirepad id="firepad-container" />
      </TaskContentBody>
    </div>
  );
}

Firepad.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  readOnly: PropTypes.bool,
};

Firepad.defaultProps = {
  readOnly: true,
  title: '',
};
