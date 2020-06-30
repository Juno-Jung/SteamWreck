import React, { FunctionComponent  } from 'react';
import { shallow } from 'enzyme';
import RecommendationReason from './RecommendationReason';

describe('RecommendationReason', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<RecommendationReason />);
    expect(wrapper).toMatchSnapshot();
  });
});
