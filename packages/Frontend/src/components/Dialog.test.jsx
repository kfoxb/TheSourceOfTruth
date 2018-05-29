/* eslint-env jest */
import Dialog from './Dialog';

describe('Dialog Component', () => {
  it('should be a function', () => {
    expect(typeof Dialog).toBe('function');
  });

  it('should render Dialog when dialogIsOpen is true', () => {
    const res = Dialog({ dialogIsOpen: true });
    expect(res).toMatchSnapshot();
  });

  it('should not render Dialog when dialogIsOpen is false', () => {
    const res = Dialog({ dialogIsOpen: false });
    expect(res).toMatchSnapshot();
  });
});
