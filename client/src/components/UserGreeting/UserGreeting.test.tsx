import * as React from 'react';
import { shallow } from 'enzyme';
import UserGreeting from './UserGreeting';

describe('UserGreeting', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<UserGreeting />);
    expect(wrapper).toMatchSnapshot();
  });
});
