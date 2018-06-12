import React from 'react';
import Dropzone from 'react-dropzone';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Backup from '@material-ui/icons/Backup';
import LinearProgress from '@material-ui/core/LinearProgress';
import colors from '../constants/colors';
import './ImageUploaderModal.css';

const styles = {
  barColorPrimary: {
    backgroundColor: `${colors.blue}`,
  },
  root: {
    backgroundColor: `${colors.grey}`,
  },
};

function ImageUploaderModal({
  classes,
  closeModal,
  handleImage,
  modalOpen,
  uploading,
}) {
  if (modalOpen) {
    return (
      <div className="firepad-dialog-div">
        {
          uploading && <LinearProgress
            classes={{
              root: classes.root,
              barColorPrimary: classes.barColorPrimary,
            }}
          />
        }
        <Dropzone
          accept="image/gif, image/jpeg, image/png, image/svg+xml"
          className="dropzone"
          onDrop={handleImage}
          style={{
            border: `1px dotted ${colors.grey}`,
            display: 'grid',
            gridTemplateColumns: '1fr',
            height: '225px',
            justifyItems: 'center',
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <Backup style={{ color: `${colors.grey}`, height: '90px', width: '90px' }} />
          <div style={{ color: `${colors.grey}`, textAlign: 'center' }}>
            <h4>DRAG & DROP</h4>
            <p>or</p>
          </div>
          <Button style={{ backgroundColor: `${colors.blue}`, color: `${colors.white}`, marginBottom: '14px' }}>Browse Files</Button>
        </Dropzone>
        <Button onClick={closeModal} className="firepad-btn" style={{ backgroundColor: `${colors.purple}`, color: `${colors.white}` }}>
            Cancel
        </Button>
      </div>
    );
  }
  return null;
}

export default withStyles(styles)(ImageUploaderModal);
