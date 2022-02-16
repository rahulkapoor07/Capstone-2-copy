import { render } from '@testing-library/react';
import MortgageModal from './MortgageModal';
import App from "../App";


test("render without crashing", ()=>{
    render(<App><MortgageModal/></App>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<App><MortgageModal/></App>);
    expect(asFragment()).toMatchSnapshot();
});