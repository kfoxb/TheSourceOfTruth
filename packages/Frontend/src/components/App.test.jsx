/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import 'react-quill';
import App from './App';

jest.mock('react-quill');

describe('App', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<App.WrappedComponent
      isAuthenticated
      logout={() => {}}
      toggleVisibility={() => {}}
      visible
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
