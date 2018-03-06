/* eslint-env jest */
import { createAssertWithPropsToMatchSnapshot } from '../../test-utils';
import Authenticate from './Authenticate';

describe('Authenticate', () => {
  const noOp = () => {};
  const defaultProps = {
    error: false,
    loading: false,
    signIn: noOp,
    submitIfEnter: noOp,
    updateFormByKey: noOp,
  };
  const assertWithPropsToMatchSnapshot =
    createAssertWithPropsToMatchSnapshot(Authenticate, defaultProps);
  it('should render', () => {
    assertWithPropsToMatchSnapshot();
  });

  it('should render an error when passed as a prop', () => {
    assertWithPropsToMatchSnapshot({ error: 'test error' });
  });

  it('should render a loading message when passed loading as a prop', () => {
    assertWithPropsToMatchSnapshot({ loading: true });
  });
});
