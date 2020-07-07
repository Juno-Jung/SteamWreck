import * as React from 'react';
import { shallow } from 'enzyme';
import GameLinks from './GameLinks';

describe('GameLinks', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<GameLinks />);
    expect(wrapper).toMatchSnapshot();
  });
});
