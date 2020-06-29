import React, { FunctionComponent  } from 'react';
import { shallow } from 'enzyme';
import GameCardMedium from './GameCardMedium';

describe('GameCardMedium', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<GameCardMedium />);
    expect(wrapper).toMatchSnapshot();
  });
});
