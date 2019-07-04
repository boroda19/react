import React from 'react';
import { mount } from 'enzyme';
import { Composer } from './';
import avatar from '../../theme/assets/lisa.png';

const props = {
    _createPost:          jest.fn(),
    avatar,
    currentUserFirstname: 'Андрей',
};

const comment = 'Hello! I am comment';

const initialState = {
    comment: '',
};

const updateState = {
    comment,
};

const result = mount(<Composer { ...props } />);

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');
const _submitOnEnterSpy = jest.spyOn(result.instance(), '_submitOnEnter');
const _updateCommentSpy = jest.spyOn(result.instance(), '_updateComment');


describe('composer component:', () => {
    test('should have 1 section element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have 1 textarea element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('should have 1 form element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have 1 img element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('should have 1 input element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('textarea value should be empty', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('should respond to state change properly', () => {
        result.setState({
            comment,
        });

        expect(result.state()).toEqual(updateState);
        expect(result.find('textarea').text()).toBe(comment);

        result.setState({
            comment: '',
        });

        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle textarea change event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });

        expect(result.find('textarea').text()).toBe(comment);
        expect(result.state()).toEqual(updateState);
    });

    test('should handle form submit event', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(initialState);
    });

    test('_createPost props should be invoked once after form submission', () => {
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and _handleFormSubmit class methods should be invoked once after form is submitted', () => {
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });

    test('_submitOnEnter class methods should be invoked once after form is submitted from enter button', () => {
        result.find('textarea').simulate('keypress', {key: 'Enter'});

        expect(_submitOnEnterSpy).toHaveBeenCalledTimes(1);
    });

    test('_handleFormSubmit class methods should be invoked once after click on submit button', () => {
        result.find('input').simulate('click');

        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });

    test('avatar props should be not empty', () => {
        expect(props.avatar).not.toBe('');
        expect(props.avatar).toMatchSnapshot();
    });

    test('currentUserFirstname props should be not empty', () => {
        expect(props.currentUserFirstname).not.toBe('');
    });

    test('currentUserFirstname props should be like config name', () => {
        expect(props.currentUserFirstname).toBe('Андрей');
        expect(props.currentUserFirstname).toMatchSnapshot();
    });

    test('_updateComment class methods should be invoked after change textarea value', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });
        expect(_updateCommentSpy).toHaveBeenCalledTimes(2);
        expect(result.find('textarea').text()).toBe(comment);
        expect(result.find('textarea').text()).toMatchSnapshot();
    });
});
