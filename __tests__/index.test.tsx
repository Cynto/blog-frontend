require('jest-fetch-mock').enableMocks();
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Home from '../pages/index';
import useUserObject from '../hooks/useUserObject';
import { Router, useRouter } from 'next/router';

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
jest.mock(
  'next/link',
  () =>
    ({ children }) =>
      children
);
jest.mock('../hooks/useUserObject');



describe('Home', () => {
  beforeEach(() => {
    useUserObject.mockReturnValue({
      userObj,
    });
  });

  it('renders without crashing', () => {
    render(<Home />);
  });
  it('renders the header', () => {
    render(<Home />);
    expect(screen.getByText('Bloggy')).toBeInTheDocument();
  });
});
