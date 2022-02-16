import { render } from '@testing-library/react';
import RentList from './RentList';
import App from "../App";


test("render without crashing", ()=>{
    render(<App><RentList/></App>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<App><RentList/></App>);
    expect(asFragment()).toMatchSnapshot();
});