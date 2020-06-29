import * as React from 'react';
import { shallow } from 'enzyme';
import GameCardLarge from './GameCardLarge';

describe('GameCardLarge', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<GameCardLarge />);
    expect(wrapper).toMatchSnapshot();
  });
});
