import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from '../utils/test-utils';
import EditPost from '../pages/posts/edit/[url]';
import * as formValidators from '../vanillaTypescript/formValidators';
import { getServerSideProps } from '../pages/posts/edit/[url]';

const userObj = {
  _id: '1',
  firstName: 'John',
  lastName: 'Doe',

  isAdmin: false,
};
const adminUser = {
  ...userObj,
  isAdmin: true,
};

const post = {
  _id: '2',
  title: 'Test Post',
  content: 'Test Contentttttt',
  tags: ['Test', 'Tags'],
  image: 'https://i.imgur.com/Z01mrue.jpg',
  published: false,
  url: 'test-post',
  user: userObj,
  comments: [],
  featured: false,
  createdAt: '2021-01-01T00:00:00.000Z',
  updatedAt: '2021-01-01T00:00:00.000Z',
};

const postWithErrors = {
  _id: '3',
  title: 'Test',
  content: 'Test',
  tags: ['Tes'],
  image: 'dd',
  published: false,
  url: 'test-post',
  user: userObj,
  comments: [],
  featured: false,
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

describe('Edit post page tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();
    localStorage.setItem('token', 'test-token');

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
                msg: 'Content must have between 10 and 10000 characters',
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

            const dataToSend = {
              title,
              image,
              tags,
              content,
            };
            successCallback(dataToSend);
          }
        }
      );
  });

  it('getServerSideProps returns post', async () => {
    fetch.mockResponseOnce(JSON.stringify({ post }));
    const { props } = await getServerSideProps({
      params: { url: 'test-post' },
    });
    expect(props.post).toEqual(post);
  });
  it('getServerSideProps returns 404 if post is not found', async () => {
    fetch.mockResponseOnce(JSON.stringify({ post: null }));
    const { notFound } = await getServerSideProps({
      params: { url: 'test-post' },
    });
    expect(notFound).toEqual(true);
  });

  it('renders without crashing', async () => {
    fetch.mockResponseOnce(JSON.stringify({ user: adminUser }));
    await act(async () => {
      renderWithProviders(<EditPost post={post} />);
    });
  });

  it('pushes to home if user is not an admin', async () => {
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
      renderWithProviders(<EditPost post={post} />, {
        preloadedState: { userObj },
      });
    });
    expect(push).toHaveBeenCalledWith('/');
  });

  it('renders title, image, tags, and content', async () => {
    fetch.mockResponseOnce(JSON.stringify({ user: adminUser }));
    await act(async () => {
      renderWithProviders(<EditPost post={post} />);
    });
    expect(screen.getByLabelText('Title *')).toBeInTheDocument();
    expect(screen.getByLabelText('Image URL *')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Tags (Seperate tags with a comma and a space) *')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Content *')).toBeInTheDocument();
  });

  it('renders title, image, tags, and content with post data', async () => {
    fetch.mockResponseOnce(JSON.stringify({ user: adminUser }));
    await act(async () => {
      renderWithProviders(<EditPost post={post} />);
    });
    expect(screen.getByLabelText('Title *')).toHaveValue(post.title);
    expect(screen.getByLabelText('Image URL *')).toHaveValue(post.image);
    expect(
      screen.getByLabelText('Tags (Seperate tags with a comma and a space) *')
    ).toHaveValue(post.tags.join(','));
    await userEvent.type(screen.getByText('Content *'), post.content);
    expect(screen.getByLabelText('Content *')).toHaveValue(post.content);
  });

  it('validation function is called when form is submitted', async () => {
    fetch.mockResponseOnce(JSON.stringify({ user: adminUser }));
    fetch.mockResponseOnce(JSON.stringify({ post }));
    const validateUpdateForm = jest.spyOn(
      formValidators,
      'validateCreationForm'
    );
    await act(async () => {
      renderWithProviders(<EditPost post={post} />);
    });
    await userEvent.type(
      screen.getByLabelText('Content *'),
      'Test Contentttttttttt'
    );
    await userEvent.click(screen.getByText('Update Post'));
    expect(validateUpdateForm).toHaveBeenCalled();
  });

  it('validation function is not called if user is not admin', async () => {
    fetch.mockResponseOnce(JSON.stringify({ user: userObj }));

    const validateUpdateForm = jest.spyOn(
      formValidators,
      'validateCreationForm'
    );
    await act(async () => {
      renderWithProviders(<EditPost post={post} />);
    });
    await userEvent.type(
      screen.getByLabelText('Content *'),
      'Test Contentttttttttt'
    );
    await userEvent.click(screen.getByText('Update Post'));

    expect(validateUpdateForm).not.toHaveBeenCalled();
  });

  it('push is called with post-url if form is valid', async () => {
    fetch.mockResponseOnce(JSON.stringify({ post }));
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
      query: '',
      asPath: '',
      route: '/',
    }));

    await act(async () => {
      renderWithProviders(<EditPost post={post} />, {
        preloadedState: { userObj: adminUser },
      });
    });
    await userEvent.type(
      screen.getByLabelText('Content *'),
      'Test Contentttttttttt'
    );
    await userEvent.click(screen.getByText('Update Post'));

    expect(push).toHaveBeenCalledWith('/loading/test-post');
  });

  it('push is not called if form is invalid', async () => {
    fetch.mockResponseOnce(JSON.stringify({ post }));
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
      query: '',
      asPath: '',
      route: '/',
    }));

    await act(async () => {
      renderWithProviders(<EditPost post={post} />, {
        preloadedState: { userObj: adminUser },
      });
    });
    await userEvent.click(screen.getByText('Update Post'));

    expect(push).not.toHaveBeenCalled();
  });

  it('error is displayed if form is invalid', async () => {
    await act(async () => {
      renderWithProviders(<EditPost post={postWithErrors} />, {
        preloadedState: { userObj: adminUser },
      });
    });
    await userEvent.click(screen.getByText('Update Post'));
    expect(
      screen.getByText('Title must have 5 or more characters')
    ).toBeInTheDocument();
    expect(screen.getByText('Image URL must be valid')).toBeInTheDocument();
    expect(
      screen.getByText('Content must have between 10 and 10000 characters')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Each tag must have between 4 and 20 characters')
    ).toBeInTheDocument();
  });

  it('renders server error if there is one', async () => {
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
      renderWithProviders(<EditPost post={post} />, {
        preloadedState: { userObj: adminUser },
      });
    });

    await userEvent.type(
      screen.getByLabelText('Content *'),
      'Test Contentttttttttt'
    );

    await userEvent.click(screen.getByText('Update Post'));
    expect(screen.getByText('Server Error')).toBeInTheDocument();
  });
});
