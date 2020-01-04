import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import User from './';
import { StoreType } from '../../reducers';

const mockStore = configureStore();

describe('user', () => {
    beforeEach(() => {
        jest.mock('../../sagas/http', () => require('../../sagas/http.mock')());
    });

    afterEach(() => {
        jest.resetModules();
    });

    it('sets password', () => {
        const initialState = {};
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <User />
            </Provider>
        );
    
        fireEvent.change(screen.getByPlaceholderText(/old password/i), {
            target: { value: 'test' },
        });
    
        fireEvent.change(screen.getByPlaceholderText(/^new password/i), {
            target: { value: 'test1' },
        });
    
        fireEvent.change(screen.getByPlaceholderText(/confirm new password/i), {
            target: { value: 'test1' },
        });
    
        fireEvent.click(screen.getByText(/set password/i, { 
            selector: 'button'
        }));

        const actions = store.getActions()
        const expectedPayload = { type: 'SET_PASSWORD', value: { oldPassword: 'test', password: 'test1' } };
        expect(actions).toEqual([ expectedPayload ]);
    });
});