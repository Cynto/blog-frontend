import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from '../utils/test-utils';
import Create from '../pages/posts/create';
import * as formValidators from '../vanillaTypescript/formValidators';
import fetch from 'jest-fetch-mock'


const userObj = {
  _id: '1',
  firstName: 'John',
  lastName: 'Doe',
  loggedIn: true,
  isAdmin: false,
};
const adminUser = {
  ...userObj,
  isAdmin: true,
};

const post = {
  _id: '2',
  title: 'Test Post',
  content: 'Test Content',
  tags: ['Test', 'Tags'],
  imageUrl: 'Test Image URL',
  published: false,
  url: 'test-post',
  user: userObj,
  createdAt: '2021-01-01T00:00:00.000Z',
  updatedAt: '2021-01-01T00:00:00.000Z',
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

describe('Create post page tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();
    localStorage.removeItem('token');

    jest
      .spyOn(formValidators, 'validateCreationForm')
      .mockImplementation(
        (
          data: any,
          contentN: string,
          successCallback: Function,
          errorCallback: Function
        ) => {
          let errorsArr: {
            value: String;
            msg: String;
            param: String;
            location: String;
          }[] = [];
          const title = screen.getByLabelText('Title *') as HTMLInputElement;
          const image = screen.getByLabelText(
            'Image URL *'
          ) as HTMLInputElement;
          const tags = screen.getByLabelText(
            'Tags (Seperate tags with a comma and a space) *'
          ) as HTMLInputElement;
          const content = screen.getByLabelText(
            'Content *'
          ) as HTMLTextAreaElement;

          if (!title.value && !errorsArr.find((e) => e.param === 'title')) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'Title is required',
                value: '',
                param: 'title',
                location: 'body',
              },
            ];
          } else if (
            title.value.length > 75 &&
            !errorsArr.find((e) => e.param === 'title')
          ) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'Title must have 75 or less characters',
                value: '',
                param: 'title',
                location: 'body',
              },
            ];
          } else if (
            title.value.length < 5 &&
            !errorsArr.find((e) => e.param === 'title')
          ) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'Title must have 5 or more characters',
                value: '',
                param: 'title',
                location: 'body',
              },
            ];
          }
          if (!image.value && !errorsArr.find((e) => e.param === 'image')) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'Image is required',
                value: '',
                param: 'image',
                location: 'body',
              },
            ];
          }
          function isUrl(s: string) {
            var regexp =
              /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            return regexp.test(s);
          }
          if (
            !isUrl(image.value) &&
            !errorsArr.find((e) => e.param === 'image')
          ) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'Image URL must be valid',
                value: '',
                param: 'image',
                location: 'body',
              },
            ];
          }
          if (content.value.length < 10 || content.value.length > 10000) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'Content must be between 10 and 10000 characters',
                value: '',
                param: 'content',
                location: 'body',
              },
            ];
          }

          let tagsArray = tags.value ? tags.value.split(',') : [];
          tagsArray = tagsArray.map((tag: string) => {
            return tag.trim();
          });

          if (
            (tagsArray.length === 0 || tagsArray.length > 20) &&
            !errorsArr.find((error) => error.param === 'tags')
          ) {
            errorsArr = [
              ...errorsArr,
              {
                msg: 'There must be between 1 and 20 tags',
                value: '',
                param: 'tags',
                location: 'body',
              },
            ];
          }
          if (!errorsArr.find((error) => error.param === 'tags')) {
            if (
              tagsArray.find((tag: string) => {
                if (tag.length > 20) return true;
              }) ||
              tagsArray.find((tag: string) => {
                if (tag.length < 4) return true;
              })
            ) {
              errorsArr = [
                ...errorsArr,
                {
                  msg: 'Each tag must have between 4 and 20 characters',
                  value: '',
                  param: 'tags',
                  location: 'body',
                },
              ];
            }
          }

          if (errorsArr.length > 0) {
            errorCallback(errorsArr);
          } else {
            errorCallback([]);
            successCallback(data);
          }
        }
      );
  });

  it('renders without crashing', async () => {
    await act(async () => {
      renderWithProviders(<Create />);
    });
  });
  
  it('renders the header', async () => {
    await act(async () => {
      renderWithProviders(<Create />);
    });

    expect(screen.getByText('Bloggy')).toBeInTheDocument();
  });

  it('renders the form', async () => {
    await act(async () => {
      renderWithProviders(<Create />);
    });

    expect(screen.getByLabelText('Title *')).toBeInTheDocument();
    expect(screen.getByLabelText('Image URL *')).toBeInTheDocument();
    expect(screen.getByLabelText('Content *')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Tags (Seperate tags with a comma and a space) *')
    ).toBeInTheDocument();
    expect(screen.getByTestId('create-post')).toBeInTheDocument();
  });

  it('validation function is called when form is submitted', async () => {
    localStorage.setItem('token', 'test-token');
    fetch.mockResponseOnce(JSON.stringify({ user: adminUser }));
    const validateCreationFormSpy = jest.spyOn(
      formValidators,
      'validateCreationForm'
    );

    await act(async () => {
      renderWithProviders(<Create />);
    });

    await userEvent.type(screen.getByLabelText('Title *'), 'test title');
    await userEvent.type(screen.getByLabelText('Image URL *'), 'test image');
    await userEvent.type(screen.getByLabelText('Content *'), 'test content');
    await userEvent.type(
      screen.getByLabelText('Tags (Seperate tags with a comma and a space) *'),
      'test tag'
    );
    await userEvent.click(screen.getByTestId('create-post'));

    expect(validateCreationFormSpy).toHaveBeenCalled();
  });

  it('push is called with post-url after successful post creation', async () => {
    localStorage.setItem('token', 'test-token');
    fetch.mockResponseOnce(JSON.stringify({ user: adminUser }));
    fetch.mockResponseOnce(JSON.stringify({ post }));
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
      query: '',
      asPath: '',
      route: '/',
    }));

    const user = userEvent.setup();

    await act(async () => {
      renderWithProviders(<Create />);
    });
    expect(fetch).toBeCalledTimes(1);
    const title = 'Test Title';
    const content = 'Test Content';
    const tags = 'Test, Tags';
    const imageUrl = 'https://i.imgur.com/0vSEb71.jpg';
    const titleInput = screen.getByLabelText('Title *');
    const contentInput = screen.getByLabelText('Content *');
    const tagsInput = screen.getByTestId('tags-input');

    const imageUrlInput = screen.getByLabelText('Image URL *');
    const submitButton = screen.getByTestId('create-post');

    await user.type(titleInput, title);
    await user.type(contentInput, content);
    await user.type(tagsInput, tags);
    await user.type(imageUrlInput, imageUrl);
    await user.click(submitButton);
    expect(push).toHaveBeenCalledWith('/loading/test-post');
  });

  it('push is called if user is not an admin', async () => {
    localStorage.setItem('token', 'test-token');
    fetch.mockResponseOnce(JSON.stringify({ user: userObj }));
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
      query: '',
      asPath: '',
      route: '/',
    }));

    await act(async () => {
      renderWithProviders(<Create />);
    });
    expect(push).toHaveBeenCalledWith('/');
  });

  it('push is called if user is not logged in', async () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
      query: '',
      asPath: '',
      route: '/',
    }));

    await act(async () => {
      renderWithProviders(<Create />);
    });
    expect(push).toHaveBeenCalledWith('/');
  });

  it('errors are displayed if there are any', async () => {
    localStorage.setItem('token', 'test-token');
    fetch.mockResponseOnce(JSON.stringify({ user: adminUser }));

    await act(async () => {
      renderWithProviders(<Create />);
    });

    await userEvent.type(screen.getByLabelText('Title *'), 'te');
    await userEvent.type(screen.getByLabelText('Image URL *'), 'te');
    await userEvent.type(screen.getByLabelText('Content *'), 'te');
    await userEvent.type(
      screen.getByLabelText('Tags (Seperate tags with a comma and a space) *'),
      'te'
    );
    await userEvent.click(screen.getByTestId('create-post'));

    expect(
      screen.getByText('Title must have 5 or more characters')
    ).toBeInTheDocument();
    expect(screen.getByText('Image URL must be valid')).toBeInTheDocument();
    expect(
      screen.getByText('Content must be between 10 and 10000 characters')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Each tag must have between 4 and 20 characters')
    ).toBeInTheDocument();
  });

  it('renders server error if there is one', async () => {
    localStorage.setItem('token', 'test-token');
    fetch.mockResponseOnce(JSON.stringify({ user: adminUser }));
    fetch.mockResponseOnce(
      JSON.stringify({
        errors: [
          {
            msg: 'Server Error',
          },
        ],
      }),
      { status: 500 }
    );

    await act(async () => {
      renderWithProviders(<Create />);
    });

    await userEvent.type(screen.getByLabelText('Title *'), 'test title');
    await userEvent.type(screen.getByLabelText('Image URL *'), 'https://i.imgur.com/0vSEb71.jpg');
    await userEvent.type(screen.getByLabelText('Content *'), 'test content');
    await userEvent.type(
      screen.getByLabelText('Tags (Seperate tags with a comma and a space) *'),
      'test tag'
    );
    await userEvent.click(screen.getByTestId('create-post'));

    expect(
      screen.getByText('Server Error')
    ).toBeInTheDocument();
  });
});
