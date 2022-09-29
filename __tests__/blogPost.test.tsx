import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from '../utils/test-utils';
import BlogPost from '../pages/[url]';
import * as formValidators from '../vanillaTypescript/formValidators';
import { getServerSideProps } from '../pages/[url]';
import fetch from 'jest-fetch-mock'

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
  published: true,
  url: 'test-post',
  user: userObj,
  comments: [],
  featured: false,
  createdAt: '2021-01-01T00:00:00.000Z',
  updatedAt: '2021-01-01T00:00:00.000Z',
};
const unpublishedPost = {
  ...post,
  published: false,
};

const postWithComments = {
  ...post,
  comments: [
    {
      _id: '3',
      content: 'Test Comment',
      user: userObj,
      post: post._id,
      replies: [
        {
          _id: '4',
          content: 'Test Reply',
          user: userObj,
          originalUser: userObj,
          createdAt: '2021-01-01T00:00:00.000Z',
        },
      ],
      createdAt: '2021-01-01T00:00:00.000Z',
    },
  ],
};

const posts = [post, postWithComments];



describe('blog post page tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.resetMocks();
    localStorage.setItem('token', 'test-token');
  });

  it('getServerSideProps returns post', async () => {
    fetch.mockResponseOnce(JSON.stringify({ post }));
    fetch.mockResponseOnce(JSON.stringify({ posts }));
    const { props } = await getServerSideProps({
      params: { url: 'test-post' },
    });
    expect(props!.postData).toEqual(post);
  });

  it('getServerSideProps returns 404 if post is not found', async () => {
    fetch.mockResponseOnce(JSON.stringify({ post: null }));
    const { notFound } = await getServerSideProps({
      params: { url: 'test-post' },
    });
    expect(notFound).toEqual(true);
  });

  it('getServerSideProps returns null postData if post is not published', async () => {
    fetch.mockResponseOnce(JSON.stringify({ post: unpublishedPost }));
    fetch.mockResponseOnce(JSON.stringify({ posts }));
    const { props } = await getServerSideProps({
      params: { url: 'test-post' },
    });
    expect(props!.postData).toEqual(null);
  });

  it('renders without crashing', async () => {
    fetch.mockResponseOnce(JSON.stringify({ userObj: adminUser }));
    await act(async () => {
      renderWithProviders(
        <BlogPost postData={post} posts={posts} url={post.url} />
      );
    });

    expect(screen.getByTestId('post-heading')).toHaveTextContent(post.title);
  });

  it('pushes user if post is not published and user is not admin', async () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
      query: '',
      asPath: '',
      route: '/',
    }));

    await act(async () => {
      renderWithProviders(
        <BlogPost postData={null} posts={posts} url={post.url} />,
        {
          preloadedState: { userObj },
        }
      );
    });

    expect(push).toHaveBeenCalledWith('/404');
  });

  it('push is not called if post is not published and user is admin', async () => {
    fetch.mockResponseOnce(JSON.stringify({ post: unpublishedPost }));

    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const push = jest.fn();
    useRouter.mockImplementation(() => ({
      push,
      query: '',
      asPath: '',
      route: '/',
    }));

    await act(async () => {
      renderWithProviders(
        <BlogPost postData={null} posts={posts} url={post.url} />,
        {
          preloadedState: { userObj: adminUser },
        }
      );
    });

    expect(push).not.toHaveBeenCalled();
  });

  it('fetch is called if post is not published and user is admin', async () => {
    fetch.mockResponseOnce(JSON.stringify({ post: unpublishedPost }));

    await act(async () => {
      renderWithProviders(
        <BlogPost postData={null} posts={posts} url={post.url} />,
        {
          preloadedState: { userObj: adminUser },
        }
      );
    });

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${post.url}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
      }
    );
  });

  it('renders every part of the post', async () => {
    fetch.mockResponseOnce(JSON.stringify({ userObj: adminUser }));
    await act(async () => {
      renderWithProviders(
        <BlogPost postData={post} posts={posts} url={post.url} />
      );
    });

    expect(screen.getByTestId('post-heading')).toHaveTextContent(post.title);
    expect(screen.getByTestId('post-socials')).toBeInTheDocument();
    expect(screen.getByTestId('post-content')).toHaveTextContent(post.content);
    expect(screen.getByTestId('post-image')).toBeInTheDocument();
    expect(screen.getByTestId('post-image')).toHaveAttribute('alt', post.title);
    expect(screen.getByTestId('post-user')).toHaveTextContent(
      `Article written by: ${post.user.firstName}`
    );

    expect(screen.getByTestId('post-date')).toHaveTextContent('~01/01/2021');
  });
});
