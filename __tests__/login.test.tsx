require('jest-fetch-mock').enableMocks();
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Home from '../pages/index';
import Login from '../pages/login';
import useUserObject from '../hooks/useUserObject';

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

describe('Login tests', () => {
  beforeEach(() => {
    useUserObject.mockReturnValue({
      userObj,
    });
  });

  it('renders without crashing', () => {
    render(<Login />);
  });

  it('renders the correct form fields', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders the correct submit button', () => {
    render(<Login />);
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });
});
