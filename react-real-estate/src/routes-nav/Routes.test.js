import { render } from '@testing-library/react';
import Routes from './Routes';
import {MemoryRouter} from "react-router-dom";


test("render without crashing", ()=>{
    render(<MemoryRouter><Routes/></MemoryRouter>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<MemoryRouter><Routes/></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
});