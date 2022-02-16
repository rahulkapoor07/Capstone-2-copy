import { render } from '@testing-library/react';
import AgentCard from './AgentCard';
import {MemoryRouter} from "react-router-dom";


test("render without crashing", ()=>{
    render(<MemoryRouter><AgentCard/></MemoryRouter>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<MemoryRouter><AgentCard/></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
});