import * as React from 'react';
import { shallow } from 'enzyme';
import * as renderer from 'react-test-renderer';
import Button from './Button';

describe('Button', () => {
  test('Contains text', () => {
    // const app = shallow(<Button>Button</Button>);
    // expect(app.find('#app').text()).toEqual('Hello');
    const props = {
      style: '-primary',
      onSeonClick: (value: boolean) => {
        return;
      },
    };
    const tree = renderer.create(<Button {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});
