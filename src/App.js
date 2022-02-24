import { useState, useEffect } from 'react';
import './App.css';

function App({ onCountChange = () => {} }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    onCountChange(count);
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button
        onClick={() => {
          setCount((prevState) => prevState + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
}

export default App;
