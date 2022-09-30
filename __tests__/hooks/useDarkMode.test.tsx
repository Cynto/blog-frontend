import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import useDarkMode from '../../hooks/useDarkMode';

describe('useDarkMode', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem('dark-theme');
  });

  it('should return a boolean', async () => {
    const { result } = renderHook(() => useDarkMode());

    expect(typeof result.current[0]).toBe('boolean');
  });

  it('should return a function', async () => {
    const { result } = renderHook(() => useDarkMode());

    expect(typeof result.current[1]).toBe('function');
  });

  it('should return a function that changes the value of the first element', async () => {
    const { result } = renderHook(() => useDarkMode());

    expect(result.current[0]).toBe(false);

    await act(async () => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
  });

  it('localstorage should be updated when the function is called', async () => {
    const { result } = renderHook(() => useDarkMode());

    expect(localStorage.getItem('dark-theme')).toBe(null);

    await act(async () => {
      result.current[1](true);
    });

    expect(localStorage.getItem('dark-theme')).toBe('true');
  });
});
