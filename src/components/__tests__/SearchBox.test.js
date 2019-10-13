import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from 'components/SearchBox/SearchBox';
import Button from '../UI/Button/Button';

it('shows the Button Component', () => {
  const wrapped = shallow(<SearchBox />);

  expect(wrapped.find(Button).length).toEqual(1);
});
