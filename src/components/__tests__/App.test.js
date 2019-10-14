import React from 'react';
import { shallow } from 'enzyme';
import App from 'components/App';
import SearchBox from 'components/SearchBox/SearchBox';

it('shows the SearchBox Component', () => {
  const wrapped = shallow(<App />);

  expect(wrapped.find(SearchBox).exists()).toEqual(true);
});
