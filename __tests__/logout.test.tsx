import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Logout from '../pages/logout';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from '../utils/test-utils';

const userObj = {
  _id: '1',
  firstName: 'John',
  lastName: 'Doe',
  loggedIn: true,
};

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe('logout page tests', () => {
  beforeEach(() => {
    fetch.mockClear();
    fetch.resetMocks();
    localStorage.removeItem('token');
  });

  it('renders without crashing', async () => {
    await act(async () => {
      renderWithProviders(<Logout />);
    });
  });

  it('fetch is called on render when bearer token exists', async () => {
    localStorage.setItem('token', '123');
    fetch.mockResponseOnce(JSON.stringify({}));
    await act(async () => {
      renderWithProviders(<Logout />);
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://bloggy-api-cynto.herokuapp.com/user',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer 123',
          'Content-Type': 'application/json',
        },
      }
    );
  });

  it('fetch is not called without bearer token', async () => {
    await act(async () => {
      renderWithProviders(<Logout />);
    });

    expect(fetch).toHaveBeenCalledTimes(0);
  });

  it('removes access token from local storage on logout', async () => {
    localStorage.setItem('token', '123');
    fetch.mockResponseOnce(JSON.stringify({}));

    await act(async () => {
      renderWithProviders(<Logout />);
    });

    await userEvent.click(screen.getByTestId('logout-button'));
    expect(localStorage.getItem('token')).toBeNull();
  });
  it('push is called if no bearer token', async () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
      query: '',
      asPath: '',
      route: '/',
    }));

    await act(async () => {
      renderWithProviders(<Logout />);
    });

    expect(push).toBeCalled();
  });
  it('push is called with "/login" after logout', async () => {
    localStorage.setItem('token', '123');
    await fetch.mockResponseOnce(
      JSON.stringify({
        user: userObj,
      })
    );

    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
      query: '',
      asPath: '',
      route: '/',
    }));

    await act(async () => {
      renderWithProviders(<Logout />);
    });

    await userEvent.click(screen.getByTestId('logout-button'));
    expect(push).toBeCalled();
    expect(push).toBeCalledWith('/login');
  });
  it('back is called when cancel button is clicked', async () => {
    localStorage.setItem('token', '123');
    await fetch.mockResponseOnce(
      JSON.stringify({
        user: userObj,
      })
    );

    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const push = jest.fn();
    const back = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
      query: '',
      asPath: '',
      route: '/',
      back,
    }));

    await act(async () => {
      renderWithProviders(<Logout />);
    });
    
    await userEvent.click(screen.getByText('Cancel'))

    expect(back).toHaveBeenCalled()

  });
});
