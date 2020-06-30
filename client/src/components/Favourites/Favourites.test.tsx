import React, { FunctionComponent  } from 'react';
import { shallow } from 'enzyme';
import Favourites from './Favourites';

describe('Favourites', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Favourites />);
    expect(wrapper).toMatchSnapshot();
  });
});
