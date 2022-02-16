import { render } from '@testing-library/react';
import App from './App';

test("render withour crashing", ()=>{
  render(<App />);
})