import React from 'react';
import { mount } from 'enzyme';
import SearchBox from 'components/SearchBox/SearchBox';
import Button from '../Button/Button';

let wrapped;

beforeEach(() => {
  wrapped = mount(<SearchBox />);
});

describe('Label', () => {
  it('has a Label showing, also another to check if its containing the right text', () => {
    expect(wrapped.find('.search_box_label').length).toEqual(1);

    expect(wrapped.find('.search_box_label').text()).toEqual(
      'Pick-up Location'
    );
  });
});

describe('Button Component', () => {
  it('has a button component loaded', () => {
    expect(wrapped.find(Button).length).toEqual(1);
    expect(wrapped.find(Button).props().children).toEqual('Search');
  });
});

afterEach(() => {
  wrapped.unmount();
});
