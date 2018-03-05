/* eslint-env jest */
import { createAssertWithPropsToMatchSnapshot } from '../../test-utils';
import LargeCard from './LargeCard';

describe('LargeCard', () => {
  const defaultProps = {
    starFilled: false,
  };
  const assertWithPropsToMatchSnapshot =
    createAssertWithPropsToMatchSnapshot(LargeCard, defaultProps);
  it('should render', () => {
    assertWithPropsToMatchSnapshot();
  });

  it('should render as star filled when passed starFilled as a prop', () => {
    assertWithPropsToMatchSnapshot({ starFilled: true });
  });
});
