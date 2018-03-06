import React from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Form, Header, Icon, Loader, Segment, Message } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledLoader = styled.div`
    padding: 10px;
`;

const StyledDiv = styled.div`
  margin: auto;
  position: relative;
  top: 100px;
  width: 50%;
`;

export default function SignIn({
  authenticate, error, loading, signingin, signingup, updateFormByKey,
}) {
  const signUpButton = (
    <Button color="blue" onClick={authenticate} fluid>Sign Up</Button>
  );

  const signInButton = (
    <Button color="violet" onClick={authenticate} fluid>Sign In</Button>
  );

  return (
    <StyledDiv>
      <Segment>
        <Header as="h1" icon textAlign="center">
          <Icon name="user" circular />
          <Header.Content>
            {signingin ? 'Sign In' : 'Sign Up'}
          </Header.Content>
        </Header>
        <Form>
          <Form.Input placeholder="Email" onChange={updateFormByKey('email')} />
          <Form.Input placeholder="Password" onChange={updateFormByKey('password')} type="password" />
          {signingin ? null : (<Form.Input placeholder="Confirm Password" onChange={updateFormByKey('confirmPassword')} type="password" />) }
          {signingin ? signInButton : signUpButton }
          <Divider horizontal>Or</Divider>
          {signingin ? signUpButton : signInButton }
        </Form>
        { loading &&
          <StyledLoader>
            <Loader active inline="centered" />
          </StyledLoader>
        }
        { error &&
          <Message negative>
            <p>{error}</p>
          </Message>
        }
      </Segment>
    </StyledDiv>
  );
}

SignIn.propTypes = {
  authenticate: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  loading: PropTypes.bool.isRequired,
  updateFormByKey: PropTypes.func.isRequired,
};
