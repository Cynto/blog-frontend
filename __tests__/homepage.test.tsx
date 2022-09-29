import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../utils/test-utils';
import { getServerSideProps } from '../pages/index';
import Home from '../pages/index';
import fetch from 'jest-fetch-mock'


const userObj = {
  _id: '1',
  firstName: 'John',
  lastName: 'Doe',
};


const post = {
  _id: '1',
  title: 'Post 1',
  url: 'post-1',
  content: 'Post 1 content',
  image: 'https://i.imgur.com/0vSEb71.jpg',
  tags: ['tag1', 'tag2'],
  user: userObj,
  comments: [
    {
      _id: '1-1',
      content: 'Comment 1',
      user: userObj,
      createdAt: '2021-01-01T00:00:00.000Z',
      post: '1',
      replies: [],
    },
  ],
  published: true,
  featured: true,
  createdAt: '2021-01-01T00:00:00.000Z',
  updatedAt: '2021-01-01T00:00:00.000Z',
};
const unfeaturedPost = {
  ...post,
  featured: false,
};
const posts = [
  post,
  unfeaturedPost,
  unfeaturedPost,
  unfeaturedPost,
  unfeaturedPost,
  unfeaturedPost,
  unfeaturedPost,
  unfeaturedPost,
  unfeaturedPost,
  unfeaturedPost,
  unfeaturedPost,
  unfeaturedPost,
  unfeaturedPost,
  unfeaturedPost,
  unfeaturedPost,
];
const unfeaturedPosts = [unfeaturedPost];

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem('token');
  });

  it('getServerSideProps should return posts', async () => {
    fetch.mockResponseOnce(JSON.stringify(posts));
    const { props } = await getServerSideProps();
    expect(props.posts).toEqual(posts);
  });

  it('getServerSideProps should always return an array where first element is featured', async () => {
    fetch.mockResponseOnce(JSON.stringify(unfeaturedPosts));
    const { props } = await getServerSideProps();
    expect(props.posts[0].featured).toBe(true);
  });

  it('renders without crashing', async () => {
    await act(async () => {
      renderWithProviders(<Home posts={posts} />);
    });
  });
  it('renders the header', async () => {
    await act(async () => {
      renderWithProviders(<Home posts={posts} />);
    });
    expect(screen.getByText('Bloggy')).toBeInTheDocument();
  });

  it('renders correct frontpage article numbers, depending on width of screen', async () => {
    await act(async () => {
      renderWithProviders(<Home posts={posts} />);
      window.innerWidth = 1920;
      window.dispatchEvent(new Event('resize'));
    });
    expect(screen.getAllByTestId('standard-article')).toHaveLength(8);

    await act(async () => {
      window.innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
    });
    expect(screen.getAllByTestId('standard-article')).toHaveLength(6);

    await act(async () => {
      window.innerWidth = 820;
      window.dispatchEvent(new Event('resize'));
    });
    expect(screen.getAllByTestId('standard-article')).toHaveLength(5);
    expect(screen.getAllByTestId('no-picture-article')).toHaveLength(5);
    expect(screen.getByTestId('bottom-big-article')).toBeInTheDocument();

    expect(screen.getByTestId('featured-post')).toBeInTheDocument();
  });
});
