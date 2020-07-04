import * as React from 'react';
import { shallow } from 'enzyme';
import GameDescription from './GameDescription';

describe('GameDescription', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<GameDescription />);
    expect(wrapper).toMatchSnapshot();
  });
});
