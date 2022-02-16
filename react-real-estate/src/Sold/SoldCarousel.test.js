import { render } from '@testing-library/react';
import SoldCarousel from './SoldCarousel';
import App from "../App";


test("render without crashing", ()=>{
    render(<App><SoldCarousel/></App>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<App><SoldCarousel/></App>);
    expect(asFragment()).toMatchSnapshot();
});