/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Journal from './Journal';

describe('Home', () => {
  it('should render', () => {
    expect(shallow(<Journal />)).toMatchSnapshot();
  });
});
