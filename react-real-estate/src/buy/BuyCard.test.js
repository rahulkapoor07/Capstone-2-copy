import { render } from '@testing-library/react';
import BuyCard from './BuyCard';
import { MemoryRouter } from 'react-router-dom';


test("render without crashing", ()=>{
  render(<MemoryRouter><BuyCard/></MemoryRouter>);
});

test("snapshot", ()=>{
  const {asFragment} = render(<MemoryRouter><BuyCard/></MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
});