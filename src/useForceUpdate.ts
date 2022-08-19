import { useState } from 'react';

export default function useForceUpdate() {
  const [, setValue] = useState<number>(0);
  console.log("force updated");
  
  return () => setValue((value) => value + 1); // update state to force render
}
