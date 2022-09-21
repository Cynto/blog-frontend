import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from '../utils/test-utils';
import LoadingPost from '../pages/loading/[url]';

describe('loading post page tests', () => {
  beforeEach(() => {
    fetch.mockClear();
    fetch.resetMocks();
  });

  it('renders without crashing', async () => {
    await act(async () => {
      renderWithProviders(<LoadingPost />);
    });
  });

  it('replace is called on render', async () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const replace = jest.fn();
    useRouter.mockImplementation(() => ({
      replace,
      query: { url: 'test-post' },
      asPath: '',
      route: '/loading/[url]',
    }));

    await act(async () => {
      renderWithProviders(<LoadingPost />);
    });
    expect(replace).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith('/test-post');
  });
});
