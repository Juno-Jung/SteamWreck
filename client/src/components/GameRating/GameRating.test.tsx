import * as React from 'react';
import { shallow } from 'enzyme';
import GameRating from './GameRating';

describe('GameRating', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<GameRating />);
    expect(wrapper).toMatchSnapshot();
  });
});
