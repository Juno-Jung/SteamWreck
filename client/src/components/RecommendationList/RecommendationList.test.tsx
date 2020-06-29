import * as React from 'react';
import { shallow } from 'enzyme';
import RecommendationList from './RecommendationList';

describe('RecommendationList', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<RecommendationList />);
    expect(wrapper).toMatchSnapshot();
  });
});
