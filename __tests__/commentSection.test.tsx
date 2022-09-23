import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithProviders } from '../utils/test-utils';
import CommentSection from '../components/articlePage/CommentSection';

const userObj = {
  _id: '1',
  firstName: 'John',
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
const replies = [
  {
    _id: '4',
    content: 'Test Reply',
    user: userObj,
    originalUser: userObj,
    createdAt: '2021-01-01T00:00:00.000Z',
  },
];
const comments = [
  {
    _id: '3',
    content: 'Test Comment',
    user: userObj,
    post: post._id,
    replies,
    createdAt: '2021-01-01T00:00:00.000Z',
  },
];

const postWithComments = {
  ...post,
  comments,
};

describe('comment section tests', () => {
  beforeEach(() => {
    fetch.mockClear();
    fetch.resetMocks();
    localStorage.setItem('token', 'test-token');
  });

  it('renders without crashing', async () => {
    await act(async () => {
      renderWithProviders(<CommentSection post={post} userObj={userObj} />);
    });
  });

  it('renders comments but not reply on initial load', async () => {
    await act(async () => {
      renderWithProviders(
        <CommentSection post={postWithComments} userObj={userObj} />
      );
    });

    expect(screen.getByText('Test Comment')).toBeInTheDocument();
    expect(screen.queryByText('Test Reply')).not.toBeInTheDocument();
  });

  it('renders text if no comments', async () => {
    await act(async () => {
      renderWithProviders(<CommentSection post={post} userObj={userObj} />);
    });

    expect(screen.getByText('No comments yet')).toBeInTheDocument();
  });

  it('renders reply when reply button is clicked', async () => {
    fetch.mockResponseOnce(JSON.stringify({ replies }));

    await act(async () => {
      renderWithProviders(
        <CommentSection post={postWithComments} userObj={userObj} />
      );
    });

    await userEvent.click(screen.getByText('View replies'));
    expect(screen.getByText('Test Reply')).toBeInTheDocument();
  });

  it('renders comment form if user is logged in', async () => {
    await act(async () => {
      renderWithProviders(<CommentSection post={post} userObj={userObj} />);
    });

    expect(
      screen.getByPlaceholderText('Write a comment...')
    ).toBeInTheDocument();
  });

  it('does not render comment form if user is not logged in', async () => {
    await act(async () => {
      renderWithProviders(<CommentSection post={post} userObj={null} />);
    });

    expect(
      screen.queryByPlaceholderText('Write a comment...')
    ).not.toBeInTheDocument();
  });

  it('fetch request is made when comment form is submitted', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    await act(async () => {
      renderWithProviders(<CommentSection post={post} userObj={userObj} />);
    });

    await userEvent.type(
      screen.getByPlaceholderText('Write a comment...'),
      'Test Comment'
    );
    await userEvent.click(screen.getByText('Post'));

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('fetch is called two times if server returns successful comment', async () => {
    fetch.mockResponseOnce(JSON.stringify({comment: {}}));
    fetch.mockResponseOnce(JSON.stringify({ comments }));

    await act(async () => {
      renderWithProviders(<CommentSection post={post} userObj={userObj} />);
    });

    await userEvent.type(
      screen.getByPlaceholderText('Write a comment...'),
      'Test Comment'
    );
    await userEvent.click(screen.getByText('Post'));

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('text in input is removed when cancel button is clicked', async () => {
    await act(async () => {
      renderWithProviders(<CommentSection post={post} userObj={userObj} />);
    });

    await userEvent.type(
      screen.getByPlaceholderText('Write a comment...'),
      'Test Comment'
    );
    await userEvent.click(screen.getByText('Cancel'));

    expect(screen.getByPlaceholderText('Write a comment...')).toHaveValue('');
  });

  it('renders error message if fetch request fails', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        errors: [{ msg: 'Test Error' }],
      })
    );

    await act(async () => {
      renderWithProviders(<CommentSection post={post} userObj={userObj} />);
    });

    await userEvent.type(
      screen.getByPlaceholderText('Write a comment...'),
      'Test Comment'
    );
    await userEvent.click(screen.getByText('Post'));

    expect(screen.getByText('Sorry, something went wrong. Please try again.')).toBeInTheDocument();
  });

  it('renders reply form when reply button is clicked', async () => {
    await act(async () => {
      renderWithProviders(
        <CommentSection post={postWithComments} userObj={userObj} />
      );
    });

    await userEvent.click(screen.getByText('Reply'));
    expect(screen.getByPlaceholderText('Write a reply...')).toBeInTheDocument();
  });

  it('reply form not visible when cancel button is clicked', async () => {
    await act(async () => {
      renderWithProviders(
        <CommentSection post={postWithComments} userObj={userObj} />
      );
    });

    await userEvent.click(screen.getByText('Reply'));
    await userEvent.click(screen.getByTestId('cancel-reply-button'));
    expect(
      screen.queryByPlaceholderText('Write a reply...')
    ).not.toBeInTheDocument();
  });

  it('fetch request is made when reply form is submitted', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    await act(async () => {
      renderWithProviders(
        <CommentSection post={postWithComments} userObj={userObj} />
      );
    });

    await userEvent.click(screen.getByText('Reply'));
    await userEvent.type(
      screen.getByPlaceholderText('Write a reply...'),
      'Test Reply'
    );
    await userEvent.click(screen.getByTestId('post-reply-button'));

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/2/comments/3/replies`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
        body: JSON.stringify({
          content: 'Test Reply',
          comment: '3',
          originalUser: userObj,
        }),
      }
    );
  });

  it('fetch is called three times in total if server sends back successful reply', async () => {
    fetch.mockResponseOnce(JSON.stringify({ reply: 'Test Reply' }));
    fetch.mockResponseOnce(JSON.stringify({ comments }));
    fetch.mockResponseOnce(JSON.stringify({ replies }));

    await act(async () => {
      renderWithProviders(
        <CommentSection post={postWithComments} userObj={userObj} />
      );
    });

    await userEvent.click(screen.getByText('Reply'));
    await userEvent.type(
      screen.getByPlaceholderText('Write a reply...'),
      'Test Reply'
    );
    await userEvent.click(screen.getByTestId('post-reply-button'));

    expect(fetch).toHaveBeenCalledTimes(3);
  });

  it('renders error message if fetch request fails', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        errors: [{ msg: 'Test Error' }],
      })
    );

    await act(async () => {
      renderWithProviders(
        <CommentSection post={postWithComments} userObj={userObj} />
      );
    });

    await userEvent.click(screen.getByText('Reply'));
    await userEvent.type(
      screen.getByPlaceholderText('Write a reply...'),
      'Test Reply'
    );
    await userEvent.click(screen.getByTestId('post-reply-button'));

    expect(screen.getByText('Sorry, something went wrong. Please try again.')).toBeInTheDocument();
  });
});
