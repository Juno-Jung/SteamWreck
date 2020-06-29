import React, { FunctionComponent  } from 'react';
import { shallow } from 'enzyme';
import RecommendationWorst from './RecommendationWorst';

describe('RecommendationWorst', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<RecommendationWorst />);
    expect(wrapper).toMatchSnapshot();
  });
});
