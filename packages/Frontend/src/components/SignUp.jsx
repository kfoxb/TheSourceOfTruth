import React from 'react';
import { Button, Divider, Form, Header, Icon, Segment } from 'semantic-ui-react';

export default function SignUp() {
  return (
    <div style={{
        margin: 'auto',
        position: 'relative',
        top: 100,
        width: '50%',
      }}
    >
      <Segment>
        <Header as="h1" icon textAlign="center">
          <Icon name="user" circular />
          <Header.Content>
            Sign Up
          </Header.Content>
        </Header>
        <Form>
          <Form.Input placeholder="Username" />
          <Form.Input placeholder="Create Password" />
          <Form.Input placeholder="Confirm Password" />
          <Button color="violet" fluid>Sign Up</Button>
          <Divider horizontal>Already have an account?</Divider>
          <Button color="blue" fluid>Sign In</Button>
        </Form>
      </Segment>
    </div>
  );
}
