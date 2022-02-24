import { useState } from 'react';

export default function useCustomHook() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevState) => prevState + 1);

  return { count, increment };
}
