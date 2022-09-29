import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../utils/test-utils';
import Posts from '../pages/posts';
import fetch from 'jest-fetch-mock'

const userObj = {
  _id: '1',
  firstName: 'John',
  lastName: 'Doe',
  isAdmin: false,
};
const secondUserObj = {
  _id: '2',
  firstName: 'Jane',
  lastName: 'Doe',
  isAdmin: false,
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
  _id: '3',
  published: false,
};
const post2 = {
  ...post,
  _id: '4',
  title: 'Test Post 2',
  url: 'test-post-2',
};
const post3 = {
  ...post,
  _id: '5',
  title: 'Test Post 3',
  url: 'test-post-3',
};
const post4 = {
  ...post,
  _id: '6',
  title: 'Test Post 4',
  url: 'test-post-4',
};
const post5 = {
  ...post,
  _id: '7',
  title: 'Test Post 5',
  url: 'test-post-5',
};
const replies = [
  {
    _id: '4',
    content: 'Test Reply',
    user: userObj,
    originalUser: userObj,
    createdAt: '2021-01-01T00:00:00.000Z',
  },
];
const comment = {
  _id: '3',
  content: 'Test Comment',
  user: userObj,
  post: post._id,
  replies,
  createdAt: '2021-01-01T00:00:00.000Z',
};

const publishedPosts = [post, post2, post3, post4, post5];
const postWithComments = {
  ...post,
  comments: [comment, comment],
};

describe('posts', () => {
  beforeEach(() => {
    fetch.mockClear();
    fetch.resetMocks();
    localStorage.setItem('token', 'test-token');
  });
  afterEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()

  });

  it('renders without crashing', async () => {
    fetch.mockResponseOnce(JSON.stringify([post]));

    await act(async () => {
      renderWithProviders(<Posts />);
    });
  });

  it('renders title and sort section', async () => {
    fetch.mockResponseOnce(JSON.stringify([post]));

    await act(async () => {
      renderWithProviders(<Posts />);
    });

    expect(screen.getAllByText('Posts')).toHaveLength(2);
    expect(screen.getByText('Sort by:')).toBeInTheDocument();
  });

  it('fetch is called with correct url if user is not logged in', async () => {
    localStorage.removeItem('token');
    fetch.mockResponseOnce(JSON.stringify([post]));

    await act(async () => {
      renderWithProviders(<Posts />, {
        preloadedState: {
          userObj: null,
        },
      });
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/published`,
      {
        method: 'GET',
        headers: {
          sort: '-createdAt',
          limit: '12',
        },
      }
    );
  });

  it('fetch is called with correct url if user is logged in and admin', async () => {
    fetch.mockResponseOnce(JSON.stringify([post]));

    await act(async () => {
      renderWithProviders(<Posts />, {
        preloadedState: {
          userObj: {
            ...userObj,
            isAdmin: true,
          },
        },
      });
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/posts`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          sort: '-createdAt',
          limit: '12',
        },
      }
    );
  });

  it('posts are rendered', async () => {
    fetch.mockResponseOnce(JSON.stringify(publishedPosts));

    await act(async () => {
      renderWithProviders(<Posts />, {
        preloadedState: {
          userObj: {
            ...userObj,
            isAdmin: true,
          },
        },
      });
    });

    expect(screen.getByText(publishedPosts[0].title)).toBeInTheDocument();
    expect(screen.getByText(publishedPosts[1].title)).toBeInTheDocument();
    expect(screen.getByText(publishedPosts[2].title)).toBeInTheDocument();
    expect(screen.getByText(publishedPosts[3].title)).toBeInTheDocument();
    expect(screen.getByText(publishedPosts[4].title)).toBeInTheDocument();
  });

  it('Read, Edit and Delete buttons are rendered if user is admin', async () => {
    fetch.mockResponseOnce(JSON.stringify([post]));

    await act(async () => {
      renderWithProviders(<Posts />, {
        preloadedState: {
          userObj: {
            ...userObj,
            isAdmin: true,
          },
        },
      });
    });

    expect(screen.getByText('Read Article')).toBeInTheDocument();
    expect(screen.getByText('Edit Article')).toBeInTheDocument();
    expect(screen.getByText('Delete Article')).toBeInTheDocument();
  });

  it('only Read button is rendered if user is not admin and posts are not theirs', async () => {
    fetch.mockResponseOnce(JSON.stringify([post]));

    await act(async () => {
      renderWithProviders(<Posts />, {
        preloadedState: {
          userObj: secondUserObj,
        },
      });
    });

    expect(screen.getByText('Read Article')).toBeInTheDocument();
    expect(screen.queryByText('Edit Article')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete Article')).not.toBeInTheDocument();
  });

  it('load more text is rendered if post array length is equal to limit', async () => {
    fetch.mockResponseOnce(JSON.stringify(publishedPosts));
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      query: {
        sort: '-createdAt',
        limit: '5',
      },
      isReady: true,
    }));

    await act(async () => {
      renderWithProviders(<Posts />, {
        preloadedState: {
          userObj: {
            ...userObj,
            isAdmin: true,
          },
        },
      });
    });

    expect(screen.getByText('Load More Posts')).toBeInTheDocument();
  });

  it('load more text is not rendered if post array length is less than limit', async () => {
    fetch.mockResponseOnce(JSON.stringify([post]));
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      query: {
        sort: '-createdAt',
        limit: '5',
      },
      isReady: true,
    }));

    await act(async () => {
      renderWithProviders(<Posts />, {
        preloadedState: {
          userObj: {
            ...userObj,
            isAdmin: true,
          },
        },
      });
    });

    expect(screen.queryByText('Load More Posts')).not.toBeInTheDocument();
  });
});
