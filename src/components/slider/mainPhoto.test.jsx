import React from 'react';
import * as enzyme from 'enzyme';
import MainPhoto from './mainPhoto.jsx';

const setUp = (props={}) => {
    const component = enzyme.shallow(<MainPhoto {...props} />);
    return component;
};

const findByTestAtrr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};

describe('MainPhoto Component', () => {

    let component;
    beforeEach(() => {
        component = setUp(); 
    });

    it('Should render without errors', () => {
        const wrapper = findByTestAtrr(component, 'mainphoto-test');
        expect(wrapper.length).toBe(1);
    });
});