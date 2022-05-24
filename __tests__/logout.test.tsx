require('jest-fetch-mock').enableMocks();
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Logout from '../pages/logout';
import useUserObject from '../hooks/useUserObject';
import useRouter from 'next/router';

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
jest.mock('../hooks/useUserObject');

describe('logout page tests', () => {
  beforeEach(() => {
    useUserObject.mockReturnValue({
      userObj,
    });
  });

  it('renders without crashing', () => {
    render(<Logout />);
  });
  it('removes access token from local storage', async () => {
    localStorage.setItem('token', 'Bearer 123');
    
    render(<Logout />);

    await userEvent.click(screen.getByTestId('logout-button'));
    expect(localStorage.getItem('toekn')).toBeNull();
  });
});
