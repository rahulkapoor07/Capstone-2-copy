import { render } from '@testing-library/react';
import RentDetail from './RentDetail';
import App from "../App";


test("render without crashing", ()=>{
    render(<App><RentDetail/></App>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<App><RentDetail/></App>);
    expect(asFragment()).toMatchSnapshot();
});