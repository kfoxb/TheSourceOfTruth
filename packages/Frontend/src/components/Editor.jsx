import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';

export default function Editor({
  modules, onChange, readOnly, setRef, value,
}) {
  return (
    <ReactQuill
      modules={modules}
      onChange={onChange}
      readOnly={readOnly}
      ref={setRef}
      value={value}
    />
  );
}

Editor.propTypes = {
  modules: PropTypes.shape({
    toolbar: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  }),
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  setRef: PropTypes.func,
  value: PropTypes.string.isRequired,
};

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
};

Editor.defaultProps = {
  modules,
  onChange: Function.prototype,
  readOnly: false,
  setRef: Function.prototype,
};
