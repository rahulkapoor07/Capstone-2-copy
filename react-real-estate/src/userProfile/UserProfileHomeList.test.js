import { render } from '@testing-library/react';
import UserProfileHomeList from './UserProfileHomeList';
import App from "../App";


test("render without crashing", ()=>{
    render(<App><UserProfileHomeList/></App>);
});

test("render without crashing", ()=>{
    const {asFragment} = render(<App><UserProfileHomeList/></App>);
    expect(asFragment()).toMatchSnapshot();
});