import { render } from '@testing-library/react';
import RentCarousel from './RentCarousel';
import {MemoryRouter} from "react-router-dom"


test("render without crashing", ()=>{
    render(<MemoryRouter><RentCarousel/></MemoryRouter>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<MemoryRouter><RentCarousel/></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
});