import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';

describe('useWindowDimensions', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem('dark-theme');
  });

  it('should return an object', async () => {
    const { result } = renderHook(() => useWindowDimensions());

    expect(typeof result.current).toBe('object');
  });

  it('should return an object with a width and height property', async () => {
    const { result } = renderHook(() => useWindowDimensions());

    expect(result.current.width).toBeDefined();
    expect(result.current.height).toBeDefined();
  });

  it('should return an object with a width and height property that are numbers', async () => {
    const { result } = renderHook(() => useWindowDimensions());

    expect(typeof result.current.width).toBe('number');
    expect(typeof result.current.height).toBe('number');
  });
})