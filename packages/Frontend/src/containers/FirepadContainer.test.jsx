/* eslint-env jest */
import { createAssertWithPropsToMatchSnapshot, makeShallowCreateWrapper } from '../../test-utils';
import FirepadContainer from './FirepadContainer';

describe('FirepadContainer', () => {
  const defaultProps = {
    history: {
      replace: () => {},
    },
    match: {
      url: '',
      params: {
        id: '',
      },
    },
  };


  it('should render', () => {
    createAssertWithPropsToMatchSnapshot(FirepadContainer, defaultProps)();
  });

  describe('journals', () => {
    const createWrapper = makeShallowCreateWrapper(FirepadContainer, defaultProps);

    it('should set it\'s collection to journals when the url contains journals', () => {
      const extraProps = {
        match: {
          url: '/journals/edit/',
          params: {
            id: '',
          },
        },
      };

      const wrapper = createWrapper(extraProps);
      expect(wrapper.state().collection).toEqual('journals');
    });
  });
});
