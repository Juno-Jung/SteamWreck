import * as React from 'react';
import { shallow } from 'enzyme';
import UserSummary from './UserSummary';

describe('UserSummary', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<UserSummary />);
    expect(wrapper).toMatchSnapshot();
  });
});
