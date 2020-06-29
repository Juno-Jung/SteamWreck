import * as React from 'react';
import { shallow } from 'enzyme';
import FavouritePicker from './FavouritePicker';

describe('FavouritePicker', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<FavouritePicker />);
    expect(wrapper).toMatchSnapshot();
  });
});
