import * as React from 'react';
import { mount, shallow } from 'enzyme';
import MovieForm from './MovieForm';
import { act } from 'react-dom/test-utils';
import { render, screen, waitFor } from '@testing-library/react';

describe('Movie form', () => {
  test('should update title field on change', async () => {
    let tree;
    let input;
    tree = mount(<MovieForm />);

    input = tree.find("input[name='title']");
    waitFor(() => {
      input.simulate('change', {
        persist: () => {},
        target: {
          name: 'title',
          value: 'Title',
        },
      });
    });

    expect(input.html()).toMatch('Title');
  });

  test('should update tagline field on change', () => {
    const tree = mount(<MovieForm />);
    const input = tree.find("input[name='tagline']");
    waitFor(() => {
      input.simulate('change', {
        persist: () => {},
        target: {
          name: 'tagline',
          value: 'Tagline',
        },
      });
      expect(input.html()).toMatch('Tagline');
    });
  });

  test('should update release date field on change', () => {
    const tree = mount(<MovieForm />);
    const input = tree.find("input[name='release_date']");
    waitFor(() => {
      input.simulate('change', {
        persist: () => {},
        target: {
          name: 'release_date',
          value: '2020-12-12',
        },
      });
    });
    expect(input.html()).toMatch('2020-12-12');
  });

  test('should update poster url field on change', () => {
    const tree = mount(<MovieForm />);
    const input = tree.find("input[name='poster_path']");
    waitFor(() => {
      input.simulate('change', {
        persist: () => {},
        target: {
          name: 'poster_path',
          value: 'Poster url',
        },
      });
    });
    expect(input.html()).toMatch('Poster url');
  });

  test('should update overview field on change', () => {
    const tree = mount(<MovieForm />);
    const input = tree.find("input[name='title']");
    waitFor(() => {
      input.simulate('change', {
        persist: () => {},
        target: {
          name: 'title',
          value: 'Title',
        },
      });
    });
    expect(input.html()).toMatch('Title');
  });

  test('should update runtime field on change', () => {
    const tree = mount(<MovieForm />);
    const input = tree.find("input[name='runtime']");
    waitFor(() => {
      input.simulate('change', {
        persist: () => {},
        target: {
          name: 'runtime',
          value: 5,
        },
      });
    });

    expect(input.html()).toMatch('5');
  });

  test('should update overview field on change', () => {
    const tree = mount(<MovieForm />);
    const input = tree.find("input[name='overview']");
    waitFor(() => {
      input.simulate('change', {
        persist: () => {},
        target: {
          name: 'overview',
          value: 'Overview',
        },
      });
    });

    expect(input.html()).toMatch('Overview');
  });

  // test('should update genre field on change', () => {
  //   const tree = mount(<MovieForm />);

  //   waitFor(() => {
  //     tree.find('.multi-select').simulate('click');
  //     tree.find('.select-item').simulate('click');
  //   });

  //   expect(tree.state()).toEqual({
  //     selectedGenres: [{ label: 'Comedy', value: 'Comedy' }],
  //   });
  // });
});
