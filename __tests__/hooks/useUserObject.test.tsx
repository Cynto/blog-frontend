require('jest-fetch-mock').enableMocks();
import { renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Home from '../../pages/index';
import useUserObject from '../../hooks/useUserObject';
import { Router, useRouter } from 'next/router';

const userObj = {
  _id: '1',
  firstName: 'John',
  lastName: 'Doe',
  loggedIn: true,
};

describe('Fetch', () => {
  beforeEach(() => {
    
  });
  it('fetch is called once', async () => {
    const {result, waitForNextUpdate} = renderHook (() => useUserObject());

    await waitForNextUpdate();

    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('fetch is called with the correct url', async () => {
    const {result, waitForNextUpdate} = renderHook (() => useUserObject());

    await waitForNextUpdate();

    expect(fetch).toHaveBeenCalledWith('http://localhost:4000/user', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer null',
        'Content-Type': 'application/json',
      },
    });
  });
  it('fetch is called with the correct access token', async () => {
    localStorage.setItem('token', '123');
    const {result, waitForNextUpdate} = renderHook (() => useUserObject());

    await waitForNextUpdate();

    expect(fetch).toHaveBeenCalledWith('http://localhost:4000/user', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 123',
        'Content-Type': 'application/json',
      },
    });
  });
  it('result is set to the correct user object', async () => {
    fetch.mockResponse(JSON.stringify(userObj));

    const {result, waitForNextUpdate} = renderHook (() => useUserObject());

    await waitForNextUpdate();

    expect(result.current.userObj).toEqual(userObj);
  });
  it('no fetch response returns false userObj', async () => {
    fetch.mockResponse('');

    const {result, waitForNextUpdate} = renderHook (() => useUserObject());

    await waitForNextUpdate();

    expect(result.current.userObj).toBe(false);
  });
});
