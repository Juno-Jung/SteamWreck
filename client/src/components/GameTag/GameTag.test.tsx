import * as React from 'react';
import { shallow } from 'enzyme';
import GameTag from './GameTag';

describe('GameTag', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<GameTag />);
    expect(wrapper).toMatchSnapshot();
  });
});
