require('jest-fetch-mock').enableMocks();
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import useUserObject from '../hooks/useUserObject';
import { Router, useRouter } from 'next/router';
import { act } from 'react-dom/test-utils';
import Create from '../pages/posts/create';

const userObj = {
  _id: '1',
  firstName: 'John',
  lastName: 'Doe',
  loggedIn: true,
};
const post = {
  _id: '2',
  title: 'Test Post',
  content: 'Test Content',
  tags: ['Test', 'Tags'],
  imageUrl: 'Test Image URL',
  published: false,
  user: userObj,
};

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock('../hooks/useUserObject');

describe('Create post page tests', () => {
  beforeEach(() => {
    const mockRouter = {
      push: jest.fn(),
      pathname: '/posts/create',
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });
  it('renders without crashing', () => {
    (useUserObject as jest.Mock).mockReturnValue({
      userObj,
    });
    render(<Create />);
  });
  it('renders the header', () => {
    (useUserObject as jest.Mock).mockReturnValue({
      userObj,
    });
    render(<Create />);
    expect(screen.getByText('Bloggy')).toBeInTheDocument();
  });
  it('renders the form', () => {
    (useUserObject as jest.Mock).mockReturnValue({
      userObj,
    });
    render(<Create />);
    expect(screen.getByLabelText('Title *')).toBeInTheDocument();
    expect(screen.getByLabelText('Image URL (Optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('Content *')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Tags (Seperate tags with a comma and a space)')
    ).toBeInTheDocument();
    expect(screen.getByTestId('create-post')).toBeInTheDocument();
  });
  it('redirects to the post page after creating a post', async () => {
    (useUserObject as jest.Mock).mockReturnValue({
      userObj,
    });
    fetch.mockResponse(JSON.stringify({ post }));
    const mockRouter = {
      push: jest.fn(),
      pathname: '/posts/create',
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    const user = userEvent.setup();
    jest.setTimeout(10000);
    const { getByTestId } = render(<Create />);
    const title = 'Test Title';
    const content = 'Test Content';
    const tags = 'Test, Tags';
    const imageUrl = 'Test Image URL';
    const titleInput = screen.getByLabelText('Title *');
    const contentInput = screen.getByLabelText('Content *');
    const tagsInput = screen.getByTestId('tags-input');

    const imageUrlInput = screen.getByLabelText('Image URL (Optional)');
    const submitButton = getByTestId('create-post');

    await user.type(titleInput, title);
    await user.type(contentInput, content);
    await user.type(tagsInput, tags);
    await user.type(imageUrlInput, imageUrl);

    await user.click(submitButton);

    expect(fetch).toBeCalled();
    expect(mockRouter.push).toHaveBeenCalledWith('/posts/2');
  }, 5000);
});
