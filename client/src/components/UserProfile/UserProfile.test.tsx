import React, { FunctionComponent  } from 'react';
import { shallow } from 'enzyme';
import UserProfile from './UserProfile';

describe('UserProfile', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<UserProfile />);
    expect(wrapper).toMatchSnapshot();
  });
});
