import React from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Form, Segment, Loader, Message } from 'semantic-ui-react';

export default function SignIn({
  error, loading, signIn, submitIfEnter, updateFormByKey,
}) {
  return (
    <div>
      <Segment>
        <Form>
          <Form.Input placeholder="Username" onChange={updateFormByKey('username')} onKeyUp={submitIfEnter} />
          <Form.Input placeholder="Password" onChange={updateFormByKey('password')} onKeyUp={submitIfEnter} type="password" />
          <Button onClick={signIn} fluid>Sign In</Button>
          <Divider horizontal>Or</Divider>
          <Button fluid>Sign Up Now</Button>
        </Form>
        { loading && <Loader active inline /> }
        { error &&
          <Message negative>
            <p>{error}</p>
          </Message>
        }
      </Segment>
    </div>
  );
}

SignIn.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  loading: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  submitIfEnter: PropTypes.func.isRequired,
  updateFormByKey: PropTypes.func.isRequired,
};
