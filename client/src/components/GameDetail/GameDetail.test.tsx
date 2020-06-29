import * as React from 'react';
import { shallow } from 'enzyme';
import GameDetail from './GameDetail';

describe('GameDetail', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<GameDetail />);
    expect(wrapper).toMatchSnapshot();
  });
});
