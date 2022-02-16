import { render } from '@testing-library/react';
import RentCard from './RentCard';
import { MemoryRouter } from 'react-router-dom';


test("render without crashing", ()=>{
  render(<MemoryRouter><RentCard/></MemoryRouter>);
});

test("snapshot", ()=>{
  const {asFragment} = render(<MemoryRouter><RentCard/></MemoryRouter>);
  expect(asFragment()).toMatchSnapshot();
});