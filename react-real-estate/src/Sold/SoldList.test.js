import { render } from '@testing-library/react';
import SoldList from './SoldList';
import App from "../App";


test("render without crashing", ()=>{
    render(<App><SoldList/></App>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<App><SoldList/></App>);
    expect(asFragment()).toMatchSnapshot();
});