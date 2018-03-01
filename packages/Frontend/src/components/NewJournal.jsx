import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class NewJournal extends Component {
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
      <div style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'relative',
          top: 40,
          width: '70%',
          height: 1000,
        }}
      >
        <ReactQuill
          modules={NewJournal.modules}
          onChange={this.handleChange}
          value={this.state.text}
        />
        <div style={{
          float: 'right',
          position: 'relative',
          top: 5,
        }}
        >
          <Button color="blue">Save</Button>
          <Button color="violet">Save & Publish</Button>
        </div>
      </div>
    );
  }
}
