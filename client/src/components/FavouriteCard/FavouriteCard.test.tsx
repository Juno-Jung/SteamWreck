import * as React from 'react';
import { shallow } from 'enzyme';
import FavouriteCard from './FavouriteCard';

describe('FavouriteCard', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<FavouriteCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
