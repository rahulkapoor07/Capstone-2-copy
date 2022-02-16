import { render } from '@testing-library/react';
import EnterZip from './EnterZip';
import App from "../App";


test("render without crashing", ()=>{
    render(<App><EnterZip/></App>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<App><EnterZip/></App>);
    expect(asFragment()).toMatchSnapshot();
});