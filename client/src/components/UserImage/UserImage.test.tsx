import * as React from 'react';
import { shallow } from 'enzyme';
import UserImage from './UserImage';

describe('UserImage', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<UserImage />);
    expect(wrapper).toMatchSnapshot();
  });
});
