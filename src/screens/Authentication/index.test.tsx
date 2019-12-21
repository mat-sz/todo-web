import React from 'react';
import Authentication from './';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../store';

jest.mock('../../sagas/http', () => require('../../sagas/http.mock'));

it('signs in', (done) => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Authentication isSignup={false} />
            </MemoryRouter>
        </Provider>
    );

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