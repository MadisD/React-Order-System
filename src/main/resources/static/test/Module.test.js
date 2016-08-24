import React from 'react';
import expect from 'expect';
import Client from '../js/components/client/Client';
import {shallow} from 'enzyme';

describe('Component: Client', () => {

    const minProps = {
        client: {},
        renderError: () => {},
        validateInput: () => {},
    };

    it('renders without error', () => {
        const wrapper = shallow(<Client {...minProps}/>);
        expect(
            wrapper.length
        ).toEqual(1);
    });
});