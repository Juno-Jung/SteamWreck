import * as React from 'react';
import { shallow } from 'enzyme';
import FavouriteList from './FavouriteList';

describe('FavouriteList', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<FavouriteList />);
    expect(wrapper).toMatchSnapshot();
  });
});
