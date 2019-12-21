import React from 'react';
import Authentication from './';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { StoreType } from '../../reducers';

describe('authentication', () => {
    beforeEach(() => {
        jest.mock('../../sagas/http', () => require('../../sagas/http.mock')());
    });

    afterEach(() => {
        jest.resetModules();
    });
    
    it('signs in', (done) => {
        const store: StoreType = require('../../store')();
    
        store.subscribe(() => {
            const state = store.getState().authenticationState;
    
            if (state.loggedIn) {
                expect(state.user).toEqual({
                    id: 1,
                    username: 'test',
                });
    
                done();
            }
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Authentication isSignup={false} />
                </MemoryRouter>
            </Provider>
        );
    
        fireEvent.change(screen.getByPlaceholderText(/username/i), {
            target: { value: 'test' },
        });
    
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: 'test' },
        });
    
        fireEvent.click(screen.getByText(/sign in/i, { 
            selector: 'button'
        }));
    });
    
    it('signs up', (done) => {
        const store: StoreType = require('../../store')();
    
        store.subscribe(() => {
            const state = store.getState().authenticationState;
            
            if (state.loggedIn) {
                expect(state.user).toEqual({
                    id: 2,
                    username: 'test2',
                });
    
                done();
            }
        });
        
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Authentication isSignup={true} />
                </MemoryRouter>
            </Provider>
        );
    
        fireEvent.change(screen.getByPlaceholderText(/username/i), {
            target: { value: 'test2' },
        });
    
        fireEvent.change(screen.getByPlaceholderText(/Password/), {
            target: { value: 'test' },
        });
    
        fireEvent.change(screen.getByPlaceholderText(/password/), {
            target: { value: 'test' },
        });
    
        fireEvent.click(screen.getByText(/sign up/i, { 
            selector: 'button'
        }));
    });
});