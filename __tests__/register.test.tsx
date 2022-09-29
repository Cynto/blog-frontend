import fetch from 'jest-fetch-mock';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Register from '../pages/register';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from '../utils/test-utils';
import * as handlers from '../vanillaTypescript/handlers';
import type { SingletonRouter } from 'next/router';
import * as formValidators from '../vanillaTypescript/formValidators';

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

describe('Register page tests', () => {
  beforeEach(() => {
    jest.clearAllMocks;
    localStorage.removeItem('token');

    jest
      .spyOn(formValidators, 'validateRegistration')
      .mockImplementation(
        async (
          data: any,
          successCallback: Function,
          errorCallback: Function,
          router: any
        ) => {
          let errorsArr: {
            value: String;
            msg: String;
            param: String;
            location: String;
          }[] = [];
          const firstName = screen.getByLabelText(
              'First Name *'
            ) as HTMLInputElement,
            lastName = screen.getByLabelText('Last Name *') as HTMLInputElement,
            email = screen.getByLabelText('Email *') as HTMLInputElement,
            password = screen.getByLabelText('Password *') as HTMLInputElement,
            confirmPassword = screen.getByLabelText(
              'Confirm Password *'
            ) as HTMLInputElement,
            adminCode = screen.getByLabelText(
              'Admin Code (Optional)'
            ) as HTMLInputElement;

          if (!firstName.value) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'First name is required',
                value: '',
                param: 'firstName',
                location: 'body',
              },
            ];
          }
          if (
            firstName.value.length < 3 &&
            !errorsArr.find((e) => e.param === 'firstName')
          ) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'First name must have more than 2 characters',
                value: '',
                param: 'firstName',
                location: 'body',
              },
            ];
          }
          if (
            firstName.value.length > 20 &&
            !errorsArr.find((e) => e.param === 'firstName')
          ) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'First name must have less than 21 characters',
                value: '',
                param: 'firstName',
                location: 'body',
              },
            ];
          }
          if (!lastName.value) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'Last name is required',
                value: '',
                param: 'lastName',
                location: 'body',
              },
            ];
          }
          if (
            lastName.value.length < 3 &&
            !errorsArr.find((e) => e.param === 'lastName')
          ) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'Last name must have more than 2 characters',
                value: '',
                param: 'lastName',
                location: 'body',
              },
            ];
          }
          if (
            lastName.value.length > 20 &&
            !errorsArr.find((e) => e.param === 'lastName')
          ) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'Last name must have less than 21 characters',
                value: '',
                param: 'lastName',
                location: 'body',
              },
            ];
          }
          if (!email.value) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'Email is required',
                value: '',
                param: 'email',
                location: 'body',
              },
            ];
          }
          if (
            !email.value.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          ) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'Email must be valid',
                value: '',
                param: 'email',
                location: 'body',
              },
            ];
          }
          if (!password.value) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'Password is required',
                value: '',
                param: 'password',
                location: 'body',
              },
            ];
          }
          if (
            password.value.length < 8 &&
            !errorsArr.find((e) => e.param === 'password')
          ) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'Password must have more than 7 characters',
                value: '',
                param: 'password',
                location: 'body',
              },
            ];
          }
          if (!confirmPassword.value) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'Confirm password is required',
                value: '',
                param: 'confirmPassword',
                location: 'body',
              },
            ];
          }
          if (
            password.value !== confirmPassword.value &&
            !errorsArr.find((e) => e.param === 'confirmPassword')
          ) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'Passwords must match',
                value: '',
                param: 'confirmPassword',
                location: 'body',
              },
            ];
          }

          if (errorsArr.length > 0) {
            errorCallback(errorsArr);
          } else {
            errorCallback([]);
            successCallback(data, router, errorCallback);
          }
        }
      );

    jest
      .spyOn(handlers, 'handleRegister')
      .mockImplementation(
        async (data: any, router: SingletonRouter, setErrors: Function) => {
          const firstName = screen.getByLabelText(
              'First Name *'
            ) as HTMLInputElement,
            lastName = screen.getByLabelText('Last Name *') as HTMLInputElement,
            email = screen.getByLabelText('Email *') as HTMLInputElement,
            password = screen.getByLabelText('Password *') as HTMLInputElement,
            confirmPassword = screen.getByLabelText(
              'Confirm Password *'
            ) as HTMLInputElement,
            adminCode = screen.getByLabelText(
              'Admin Code (Optional)'
            ) as HTMLInputElement;

          const response = await fetch(
            'https://bloggy-api-cynto.herokuapp.com/users',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value,
                confirmPassword: confirmPassword.value,
                adminCode: adminCode.value ? adminCode.value : null,
              }),
            }
          );
          const json = await response.json();

          if (json.user) {
            router.push('/login');
          } else {
            setErrors(json.errors);
          }
        }
      );
  });
  it('renders without crashing', async () => {
    await act(async () => {
      renderWithProviders(<Register />);
    });
  });
  it('renders input boxes and submit button ', async () => {
    await act(async () => {
      renderWithProviders(<Register />);
    });

    expect(screen.getByLabelText('First Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
    expect(screen.getByLabelText('Password *')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password *')).toBeInTheDocument();
    expect(screen.getByLabelText('Admin Code (Optional)')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });
  it('renders navigation links', async () => {
    await act(async () => {
      renderWithProviders(<Register />);
    });

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
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
      renderWithProviders(<Register />, {
        preloadedState: {
          userObj,
        },
      });
    });
    expect(push).toBeCalledWith('/');
  });

  it('validation function is called when submit button is clicked', async () => {
    const validateRegistration = jest.spyOn(
      formValidators,
      'validateRegistration'
    );
    await fetch.mockResponseOnce(
      JSON.stringify({
        user: userObj,
      })
    );

    await act(async () => {
      renderWithProviders(<Register />);
    });
    await userEvent.type(screen.getByLabelText('First Name *'), 'Bob');
    await userEvent.type(screen.getByLabelText('Last Name *'), 'Bobby');
    await userEvent.type(screen.getByLabelText('Email *'), 'Bob@gmail.com');
    await userEvent.type(screen.getByLabelText('Password *'), 'SecretPassword');
    await userEvent.type(
      screen.getByLabelText('Confirm Password *'),
      'SecretPassword'
    );
    await userEvent.type(
      screen.getByLabelText('Admin Code (Optional)'),
      'admin'
    );
    await userEvent.click(screen.getByText('Create Account'));

    expect(validateRegistration).toBeCalled();
  });
  it('POST fetch is called with correct parameters after registration attempt', async () => {
    await fetch.mockResponseOnce(
      JSON.stringify({
        user: userObj,
      })
    );
    await act(async () => {
      renderWithProviders(<Register />);
    });
    await userEvent.type(screen.getByLabelText('First Name *'), 'Bob');
    await userEvent.type(screen.getByLabelText('Last Name *'), 'Bobby');
    await userEvent.type(screen.getByLabelText('Email *'), 'Bob@gmail.com');
    await userEvent.type(screen.getByLabelText('Password *'), 'SecretPassword');
    await userEvent.type(
      screen.getByLabelText('Confirm Password *'),
      'SecretPassword'
    );
    await userEvent.type(
      screen.getByLabelText('Admin Code (Optional)'),
      'admin'
    );
    await userEvent.click(screen.getByText('Create Account'));

    expect(fetch).toBeCalledWith(
      'https://bloggy-api-cynto.herokuapp.com/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: 'Bob',
          lastName: 'Bobby',
          email: 'Bob@gmail.com',
          password: 'SecretPassword',
          confirmPassword: 'SecretPassword',
          adminCode: 'admin',
        }),
      }
    );
  });

  it('push is called with "/login" after successful registration', async () => {
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
      })
    );

    await act(async () => {
      renderWithProviders(<Register />);
    });

    await userEvent.type(screen.getByLabelText('First Name *'), 'Bob');
    await userEvent.type(screen.getByLabelText('Last Name *'), 'Bobby');
    await userEvent.type(screen.getByLabelText('Email *'), 'Bob@gmail.com');
    await userEvent.type(screen.getByLabelText('Password *'), 'SecretPassword');
    await userEvent.type(
      screen.getByLabelText('Confirm Password *'),
      'SecretPassword'
    );
    await userEvent.type(
      screen.getByLabelText('Admin Code (Optional)'),
      'admin'
    );
    await userEvent.click(screen.getByText('Create Account'));

    expect(push).toBeCalledWith('/login');
  });
  it('errors are displayed if registration fails', async () => {
    await fetch.mockResponseOnce(
      JSON.stringify({
        errors: {
          firstName: 'First name is required',
          lastName: 'Last name is required',
          email: 'Email is required',
          password: 'Password is required',
          confirmPassword: 'Confirm password is required',
        },
      })
    );

    await act(async () => {
      renderWithProviders(<Register />);
    });
    await userEvent.type(screen.getByLabelText('First Name *'), 'Bo');
    await userEvent.type(screen.getByLabelText('Last Name *'), 'Bo');
    await userEvent.type(screen.getByLabelText('Email *'), 'bob@gmail.com');
    await userEvent.type(screen.getByLabelText('Password *'), 'bo');
    await userEvent.type(screen.getByLabelText('Confirm Password *'), 'b0');
    await userEvent.click(screen.getByText('Create Account'));

    expect(
      screen.getByText('First name must have more than 2 characters')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Last name must have more than 2 characters')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Password must have more than 7 characters')
    ).toBeInTheDocument();
    expect(screen.getByText('Passwords must match')).toBeInTheDocument();
  });
});
