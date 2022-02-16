import { render } from '@testing-library/react';
import UserProfile from './UserProfile';
import {MemoryRouter} from "react-router-dom";
import App from "../App";


test("render without crashing", ()=>{
    render(<MemoryRouter><UserProfile/></MemoryRouter>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<MemoryRouter><App><UserProfile/></App></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
});