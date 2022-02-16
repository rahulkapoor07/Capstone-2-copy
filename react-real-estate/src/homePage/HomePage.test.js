import { render } from '@testing-library/react';
import HomePage from './HomePage';
import {MemoryRouter} from "react-router-dom";


test("render without crashing", ()=>{
    render(<MemoryRouter><HomePage/></MemoryRouter>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<MemoryRouter><HomePage/></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
});