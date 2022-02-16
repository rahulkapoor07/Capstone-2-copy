import { render } from '@testing-library/react';
import SoldCard from './SoldCard';
import {MemoryRouter} from "react-router-dom"


test("render without crashing", ()=>{
    render(<MemoryRouter><SoldCard/></MemoryRouter>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<MemoryRouter><SoldCard/></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
});