import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';

const StyledButton = styled.a`
    display: block;
    float: right;
    margin-top: 5px;
    position: relative;
`;

const StyledDiv = styled.div`
  height: 60em;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  display: block;
  top: 3em;
  width: 70%;
`;

const StyledQuill = styled.div`
  height: 90%;
  .quill {
    height: 90%;
  }
`;

export default class Editor extends Component {
  static modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
    ],
  }

  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  render() {
    return (
      <StyledDiv>
        <StyledQuill>
          <ReactQuill
            modules={Editor.modules}
            onChange={this.handleChange}
            value={this.state.text}
          />
        </StyledQuill>
        <StyledButton>
          <Button color="violet">Publish</Button>
        </StyledButton>
      </StyledDiv>
    );
  }
}
