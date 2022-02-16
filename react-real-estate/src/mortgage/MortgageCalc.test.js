import { render } from '@testing-library/react';
import MortgageCalc from './MortgageCalc';
import App from "../App";


test("render without crashing", ()=>{
    render(<App><MortgageCalc/></App>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<App><MortgageCalc/></App>);
    expect(asFragment()).toMatchSnapshot();
});