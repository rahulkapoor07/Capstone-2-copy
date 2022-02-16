import { render } from '@testing-library/react';
import BuyCarousel from './BuyCarousel';
import { MemoryRouter } from "react-router-dom";


test("render without crashing", ()=>{
    render(<MemoryRouter><BuyCarousel/></MemoryRouter>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<MemoryRouter><BuyCarousel/></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
});