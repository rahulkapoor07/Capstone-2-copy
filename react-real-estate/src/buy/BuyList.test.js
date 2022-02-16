import { render } from '@testing-library/react';
import BuyList from './BuyList';
import App from "../App";


test("render without crashing", ()=>{
    render(<App><BuyList/></App>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<App><BuyList/></App>);
    expect(asFragment()).toMatchSnapshot();
});