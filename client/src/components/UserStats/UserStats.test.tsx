import React, { FunctionComponent  } from 'react';
import { shallow } from 'enzyme';
import UserStats from './UserStats';

describe('UserStats', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<UserStats />);
    expect(wrapper).toMatchSnapshot();
  });
});
