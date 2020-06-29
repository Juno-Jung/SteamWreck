import React, { FunctionComponent  } from 'react';
import { shallow } from 'enzyme';
import GameInfo from './GameInfo';

describe('GameInfo', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<GameInfo />);
    expect(wrapper).toMatchSnapshot();
  });
});
