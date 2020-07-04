import * as React from 'react';
import { shallow } from 'enzyme';
import GameTags from './GameTags';

describe('GameTags', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<GameTags />);
    expect(wrapper).toMatchSnapshot();
  });
});
