import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Login from '../pages/login';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from '../utils/test-utils';
import * as handlers from '../vanillaTypescript/handlers';



const userObj = {
  _id: '1',
  firstName: 'John',
  lastName: 'Doe',
  
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

describe('Login tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem('token');
    jest
      .spyOn(handlers, 'handleLogin')
      .mockImplementation(
        async (data: any, router: any, setErrors: Function) => {
          const email = screen.getByLabelText('Email') as HTMLInputElement;
          const password = screen.getByLabelText(
            'Password'
          ) as HTMLInputElement;

          const response = await fetch(
            'https://bloggy-api-cynto.herokuapp.com/users/login',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email.value.toLowerCase(),
                password: password.value,
              }),
            }
          );
          const json = await response.json();

          if (json.user && json.token) {
            localStorage.setItem('token', json.token);
            router.push('/');
          } else {
            setErrors(json.errors);
          }
        }
      );
  });

  it('renders without crashing', async () => {
    await act(async () => {
      renderWithProviders(<Login />);
    });
  });

  it('renders the correct form fields', async () => {
    await act(async () => {
      renderWithProviders(<Login />);
    });
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders the correct submit button', async () => {
    await act(async () => {
      renderWithProviders(<Login />);
    });
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });
  it('handleLogin is called after login attempt', async () => {
    const handleLogin = jest.spyOn(handlers, 'handleLogin');

    await fetch.mockResponseOnce(
      JSON.stringify({
        user: userObj,
        token: 123,
      })
    );

    await act(async () => {
      renderWithProviders(<Login />);
    });

    await userEvent.type(screen.getByLabelText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByLabelText('Password'), 'SecretPassword');
    await userEvent.click(screen.getByTestId('login-button'));

    expect(handleLogin).toBeCalledTimes(1);
  });
  it('POST fetch is called with correct parameters after login attempt', async () => {
    await fetch.mockResponseOnce(
      JSON.stringify({
        user: userObj,
        token: 123,
      })
    );

    await act(async () => {
      renderWithProviders(<Login />);
    });

    await userEvent.type(screen.getByLabelText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByLabelText('Password'), 'SecretPassword');
    await userEvent.click(screen.getByTestId('login-button'));

    expect(fetch).toBeCalledWith(
      'https://bloggy-api-cynto.herokuapp.com/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@gmail.com',
          password: 'SecretPassword',
        }),
      }
    );
  });
  it('access token added to local storage on successful login', async () => {
    await fetch.mockResponseOnce(
      JSON.stringify({
        user: userObj,
        token: 123,
      })
    );
    expect(localStorage.getItem('token')).toBeNull();

    await act(async () => {
      renderWithProviders(<Login />);
    });

    await userEvent.type(screen.getByLabelText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByLabelText('Password'), 'SecretPassword');
    await userEvent.click(screen.getByTestId('login-button'));

    expect(localStorage.getItem('token')).toBe('123');
  });
  it('push is called with "/" after successful login', async () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
      query: '',
      asPath: '',
      route: '/',
    }));

    await fetch.mockResponseOnce(
      JSON.stringify({
        user: userObj,
        token: 123,
      })
    );

    await act(async () => {
      renderWithProviders(<Login />);
    });

    await userEvent.type(screen.getByLabelText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByLabelText('Password'), 'SecretPassword');
    await userEvent.click(screen.getByTestId('login-button'));

    expect(push).toBeCalledWith('/');
  });
  it('error appears on unsuccessful login', async () => {
    await fetch.mockResponseOnce(
      JSON.stringify({
        errors: [
          {
            msg: 'Invalid email or password.',
            param: 'email',
            value: '',
            location: 'body',
          },
        ],
      })
    );

    await act(async () => {
      renderWithProviders(<Login />);
    });

    await userEvent.type(screen.getByLabelText('Email'), 'test@gmail.com');
    await userEvent.type(screen.getByLabelText('Password'), 'Wrong');
    await userEvent.click(screen.getByTestId('login-button'));

    expect(screen.getByText('Invalid email or password.')).toBeInTheDocument();
  });
  it('push is called with "/" if user is already logged in', async () => {
    localStorage.setItem('token', '123');
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
      query: '',
      asPath: '',
      route: '/',
    }));

    await act(async () => {
      renderWithProviders(<Login />, {
        preloadedState: {
          userObj,
        },
      });
    });
    expect(push).toBeCalledWith('/');
  });
});
