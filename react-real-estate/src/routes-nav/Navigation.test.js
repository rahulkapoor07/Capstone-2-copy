import { render } from '@testing-library/react';
import Navigation from './Navigation';
import {MemoryRouter} from "react-router-dom"


test("render without crashing", ()=>{
    render(<MemoryRouter><Navigation/></MemoryRouter>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<MemoryRouter><Navigation/></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
});