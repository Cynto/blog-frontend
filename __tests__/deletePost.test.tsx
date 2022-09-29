import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../utils/test-utils';
import { getServerSideProps } from '../pages/posts/delete/[url]';
import PostDelete from '../pages/posts/delete/[url]';

const userObj = {
  _id: '1',
  firstName: 'John',
  lastName: 'Doe',
  isAdmin: false,
};
const userObj2 = {
  _id: '2',
  firstName: 'Jane',
  lastName: 'Doe',
  isAdmin: false,
};

const adminObj = {
  _id: '3',
  firstName: 'Admin',
  lastName: 'Doe',
  isAdmin: true,
};

const post = {
  _id: '2',
  title: 'Test Post',
  content: 'Test Contentttttt',
  tags: ['Test', 'Tags'],
  image: 'https://i.imgur.com/Z01mrue.jpg',
  published: true,
  url: 'test-post',
  user: userObj,
  comments: [],
  featured: false,
  createdAt: '2021-01-01T00:00:00.000Z',
  updatedAt: '2021-01-01T00:00:00.000Z',
};

describe('delete post tests', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'testtoken');
    fetch.mockClear();
    fetch.resetMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('getServerSideProps returns 404 if post is not found', async () => {
    fetch.mockResponseOnce(JSON.stringify({ post: null }));
    const { notFound } = await getServerSideProps({
      params: { url: 'test-post' },
    });
    expect(notFound).toEqual(true);
  });

  it('getServerSideProps successfully returns post', async () => {
    fetch.mockResponseOnce(JSON.stringify({ post }));
    const { props } = await getServerSideProps({
      params: { url: 'test-post' },
    });
    expect(props!.post).toEqual(post);
  });

  it('pushes to / if user is not admin', async () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
      query: '',
      asPath: '',
      route: '/',
    }));

    await act(async () => {
      renderWithProviders(<PostDelete post={post} />, {
        preloadedState: {
          userObj,
        },
      });
    });

    expect(push).toHaveBeenCalledWith('/');
  });

  it('should render delete post page', async () => {
    fetch.mockResponseOnce(JSON.stringify({ post }));
    await act(async () => {
      renderWithProviders(<PostDelete post={post} />, {
        preloadedState: {
          userObj: adminObj,
        },
      });
    });
    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
    expect(
      screen.getByText('This action cannot be undone.')
    ).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('fetch is called when delete button is clicked', async () => {
    fetch.mockResponseOnce(JSON.stringify({ post }));
    await act(async () => {
      renderWithProviders(<PostDelete post={post} />, {
        preloadedState: {
          userObj: adminObj,
        },
      });
    });
    await userEvent.click(screen.getByText('Delete'));
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('pushes to /posts if delete is successful', async () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
      query: '',
      asPath: '',
      route: '/',
    }));

    fetch.mockResponseOnce(
      JSON.stringify({
        status: 204,
        message: 'Post deleted successfully',
      })
    );
    await act(async () => {
      renderWithProviders(<PostDelete post={post} />, {
        preloadedState: {
          userObj: adminObj,
        },
      });
    });
    await userEvent.click(screen.getByText('Delete'));
    expect(push).toHaveBeenCalledWith('/posts');
  });

  it('back is called if cancel is clicked', async () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const back = jest.fn();
    useRouter.mockImplementation(() => ({
      back,
      query: '',
      asPath: '',
      route: '/',
    }));

    await act(async () => {
      renderWithProviders(<PostDelete post={post} />, {
        preloadedState: {
          userObj: adminObj,
        },
      });
    });
    await userEvent.click(screen.getByText('Cancel'));
    expect(back).toHaveBeenCalled();
  });
});
