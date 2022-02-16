import { render } from '@testing-library/react';
import BuyDetail from './BuyDetail';
import App from "../App";


test("render without crashing", ()=>{
    render(<App><BuyDetail/></App>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<App><BuyDetail/></App>);
    expect(asFragment()).toMatchSnapshot();
});