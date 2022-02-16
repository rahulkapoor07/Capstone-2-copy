import { render } from '@testing-library/react';
import SelectModal from './SelectModal';
import {MemoryRouter} from "react-router-dom"


test("render without crashing", ()=>{
    render(<MemoryRouter><SelectModal/></MemoryRouter>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<MemoryRouter><SelectModal/></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
});