import React, { FunctionComponent  } from 'react';
import { shallow } from 'enzyme';
import Logout from './Logout';

describe('Logout', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Logout />);
    expect(wrapper).toMatchSnapshot();
  });
});
