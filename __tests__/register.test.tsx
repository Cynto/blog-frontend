require('jest-fetch-mock').enableMocks();
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import useUserObject from '../hooks/useUserObject';
import { Router, useRouter } from 'next/router';
import Register from '../pages/register';
import { act } from 'react-dom/test-utils';

const userObj = {
  _id: '1',
  firstName: 'John',
  lastName: 'Doe',
  loggedIn: true,
};
jest.mock('../hooks/useUserObject');
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('Register page tests', () => {
  it('renders without crashing', async () => {
    (useUserObject as jest.Mock).mockReturnValue({
      userObj: null,
    });

    render(<Register />);
  });
  it('renders input boxes and submit button ', async () => {
    (useUserObject as jest.Mock).mockReturnValue({
      userObj: null,
    });

    render(<Register />);

    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });
  it('renders navigation links', () => {
    (useUserObject as jest.Mock).mockReturnValue({
      userObj: null,
    });

    render(<Register />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
  it('redirects to homepage if user is logged in', async () => {
    (useUserObject as jest.Mock).mockReturnValue({
      userObj: userObj,
    });
    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    render(<Register />);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });
  });
});
