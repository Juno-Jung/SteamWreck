import React, { FunctionComponent  } from 'react';
import { shallow } from 'enzyme';
import GameDetail from './GameDetail';

describe('GameDetail', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<GameDetail />);
    expect(wrapper).toMatchSnapshot();
  });
});
