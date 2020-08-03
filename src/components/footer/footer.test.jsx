import React from 'react';
import * as enzyme from 'enzyme';
import Footer from './footer.jsx';

const setUp = (props={}) => {
    const component = enzyme.shallow(<Footer {...props} />);
    return component;
};

const findByTestAtrr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};

describe('Footer Component', () => {

    let component;
    beforeEach(() => {
        component = setUp(); 
    });

    it('Should render without errors', () => {
        const wrapper = findByTestAtrr(component, 'footer-test');
        expect(wrapper.length).toBe(1);
    });
});