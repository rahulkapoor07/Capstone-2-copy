import { render } from '@testing-library/react';
import SoldDetail from './SoldDetail';
import App from "../App";


test("render without crashing", ()=>{
    render(<App><SoldDetail/></App>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<App><SoldDetail/></App>);
    expect(asFragment()).toMatchSnapshot();
});