import React from 'react';
import { mount } from 'enzyme';
import SearchBox from 'components/SearchBox/SearchBox';
import Button from '../UI/Button/Button';

let wrapped;

beforeEach(() => {
  wrapped = mount(<SearchBox />);
});

it('has a Label showing, also another to check if its containing the right text', () => {
  expect(wrapped.find('label').length).toEqual(1);

  expect(wrapped.find('label').props().children).toEqual('Pick-up Location');

  expect(wrapped.find(Button).length).toEqual(1);
});

it('has a button component loaded', () => {
  expect(wrapped.find(Button).length).toEqual(1);
  expect(wrapped.find(Button).props().children).toEqual('Search');
});

afterEach(() => {
  wrapped.unmount();
});
