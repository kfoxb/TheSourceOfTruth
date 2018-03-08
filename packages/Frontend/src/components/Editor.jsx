import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';

export default function Editor({
  onChange, setRef, value, modules, readOnly,
}) {
  return <ReactQuill modules={modules} onChange={onChange} readOnly={readOnly} ref={setRef} value={value} />;
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  setRef: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
