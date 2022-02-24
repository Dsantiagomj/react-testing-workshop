import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import App from './App';
import useCustomHook from './useCustomHook';

afterEach(cleanup);

describe('AppComponent', () => {
  const onCountChange = jest.fn();
  it('works', () => {
    expect(2 + 2).toEqual(4);
  });

  it('renders', () => {
    const { container } = render(<App onCountChange={onCountChange} />);
    expect(container).not.toBeNull();
  });

  it('has a display text and a default value', () => {
    render(<App onCountChange={onCountChange} />);
    const paragraph = screen.getByText(/Count: 0/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('has a button', () => {
    render(<App onCountChange={onCountChange} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('increment in 1 when button is clicked', () => {
    render(<App onCountChange={onCountChange} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const paragraph = screen.getByText(/Count: 1/i);
    expect(paragraph).toBeTruthy();
  });

  it('increment in 4 when button is clicked 4 times', () => {
    render(<App onCountChange={onCountChange} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    const paragraph = screen.getByText(/Count: 4/i);
    expect(paragraph).toBeTruthy();
  });

  it('should call onCountChange when render', () => {
    render(<App onCountChange={onCountChange} />);
    expect(onCountChange).toBeCalledTimes(1);
  });

  it('should call onCountchange on rerenderer', () => {
    render(<App onCountChange={onCountChange} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onCountChange).toBeCalledTimes(2);
  });
});

describe.only('useCustomHook', () => {
  it('works', () => {
    let results;
    function HookWrapper() {
      results = useCustomHook();
      return null;
    }
    render(<HookWrapper />);
    expect(2 + 2).toEqual(4);
  });

  it('has a count prop with a default value of 0', () => {
    let results;
    function HookWrapper() {
      results = useCustomHook();
      return null;
    }
    render(<HookWrapper />);
    expect(results.count).toEqual(0);
  });

  it('updates count state to 1 when increment is called one time', () => {
    let results;
    function HookWrapper() {
      results = useCustomHook();
      return null;
    }
    render(<HookWrapper />);
    results.increment();
    expect(results.count).toEqual(1);
  });

  it('updates count state to 4 when increment is called four times', () => {
    let results;
    function HookWrapper() {
      results = useCustomHook();
      return null;
    }
    render(<HookWrapper />);
    results.increment();
    results.increment();
    results.increment();
    results.increment();
    expect(results.count).toEqual(4);
  });
});
