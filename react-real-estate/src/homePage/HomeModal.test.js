import { render } from '@testing-library/react';
import HomeModal from './HomeModal';
import App from "../App";


test("render without crashing", ()=>{
    render(<App><HomeModal/></App>);
});

// test("render without crashing", ()=>{
//     const {asFragment} = render(<App><HomeModal/></App>);
//     expect(asFragment()).toMatchSnapshot();
// });