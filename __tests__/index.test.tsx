require('jest-fetch-mock').enableMocks();
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Home from '../pages/index';

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

describe('Fetch', () => {
  beforeEach(() => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          _id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@gmail.com',
          createdAt: '2020-01-01',
          lastLogin: '2020-01-01',
          __v: 0,
        },
      })
    );
  });
  it('fetch is called once', () => {
    render(<Home />);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('fetch is called with the correct url', () => {
    render(<Home />);
    expect(fetch).toHaveBeenCalledWith('http://localhost:4000/user', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer null',
        'Content-Type': 'application/json',
      },
    });
  });
  it('fetch is called with the correct access token', () => {
    localStorage.setItem('token', '123');
    render(<Home />);
    expect(fetch).toHaveBeenCalledWith('http://localhost:4000/user', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 123',
        'Content-Type': 'application/json',
      },
    });
  });
});

describe('Home', () => {
  beforeEach(() => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          _id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@gmail.com',
          createdAt: '2020-01-01',
          lastLogin: '2020-01-01',
          __v: 0,
        },
      })
    );
  });

  it('renders without crashing', () => {
    render(<Home />);
  });
  it('renders the header', () => {
    render(<Home />);
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });
});

describe('Logout', () => {
  beforeEach(() => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          _id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@gmail.com',
          createdAt: '2020-01-01',
          lastLogin: '2020-01-01',
          __v: 0,
        },
      })
    );
  });
  it('renders logout form on click', async () => {
    render(<Home />);
    const logout = screen.getByTestId('header-logout');
    await userEvent.click(logout);

    expect(screen.getByTestId('logout-form')).toBeInTheDocument();
  });
  it('deletes token on logout', async () => {
    render(<Home />);
    localStorage.setItem('token', '123');
    const logout = screen.getByTestId('header-logout');
    await userEvent.click(logout);
    const logoutForm = screen.getByTestId('logout-form');
    const logoutButton = screen.getByTestId('logout-button');
    await userEvent.click(logoutButton);
    expect(localStorage.getItem('token')).toBeNull();
  });
  
}
);
    
    

