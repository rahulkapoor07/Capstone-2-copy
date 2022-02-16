import { render } from '@testing-library/react';
import HomeDetail from './HomeDetail';
import {MemoryRouter} from "react-router-dom";


test("render without crashing", ()=>{
    render(<MemoryRouter><HomeDetail/></MemoryRouter>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<MemoryRouter><HomeDetail/></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
});