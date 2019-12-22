import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import List from './';
import { StoreType } from '../../reducers';

describe('list', () => {
    beforeEach(() => {
        jest.mock('../../sagas/http', () => require('../../sagas/http.mock')());
    });

    afterEach(() => {
        jest.resetModules();
    });

    it('loads project', (done) => {
        const store: StoreType = require('../../store').default();
    
        store.subscribe(() => {
            const state = store.getState().projectState;
    
            if (state.currentProject) {
                expect(state.currentProject).toMatchObject({
                    id: 1,
                    name: 'test',
                });
    
                done();
            }
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[ 'projects/1/lists/1' ]}>
                    <Route path='projects/:project_id/lists/:id'>
                        <List />
                    </Route>
                </MemoryRouter>
            </Provider>
        );
    });

    it('adds new items', async (done) => {
        const store: StoreType = require('../../store').default();
    
        store.subscribe(() => {
            const state = store.getState().projectState;
    
            if (state.currentProject
                && state.currentProject.todoLists.length > 0) {
                const list = state.currentProject.todoLists[0];

                if (list.todoItems.length > 1) {
                    expect(list.todoItems).toContainEqual(
                        expect.objectContaining({
                            name: 'test 2',
                        })
                    );
        
                    done();
                }
            }
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[ 'projects/1/lists/1' ]}>
                    <Route path='projects/:project_id/lists/:id'>
                        <List />
                    </Route>
                </MemoryRouter>
            </Provider>
        );

        const addButton = await screen.findByText(/add/i, { selector: 'button' });

        fireEvent.change(screen.getByText('', { selector: 'input[type="text"]' }), {
            target: { value: 'test 2' },
        });

        addButton.click();
    });

    it('marks items as done', async (done) => {
        const store: StoreType = require('../../store').default();
    
        store.subscribe(() => {
            const state = store.getState().projectState;
    
            if (state.currentProject
                && state.currentProject.todoLists.length > 0) {
                const list = state.currentProject.todoLists[0];

                if (list.todoItems.length > 0) {
                    const item = list.todoItems[0];
        
                    if (item.done)
                        done();
                }
            }
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[ 'projects/1/lists/1' ]}>
                    <Route path='projects/:project_id/lists/:id'>
                        <List />
                    </Route>
                </MemoryRouter>
            </Provider>
        );

        const checkbox = await screen.findByText('', { selector: 'input[type="checkbox"]' });

        fireEvent.click(checkbox);
    });

    it('updates items', async (done) => {
        const store: StoreType = require('../../store').default();
    
        store.subscribe(() => {
            const state = store.getState().projectState;
    
            if (state.currentProject
                && state.currentProject.todoLists.length > 0) {
                const list = state.currentProject.todoLists[0];

                if (list.todoItems.length > 0) {
                    const item = list.todoItems[0];
        
                    if (item.name === 'test 2')
                        done();
                }
            }
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[ 'projects/1/lists/1' ]}>
                    <Route path='projects/:project_id/lists/:id'>
                        <List />
                    </Route>
                </MemoryRouter>
            </Provider>
        );

        const item = await screen.findByText('test', { selector: 'span' });
        fireEvent.contextMenu(item);

        const renameButton = await screen.findByText(/rename/i);
        fireEvent.click(renameButton);
        
        fireEvent.change(screen.getByDisplayValue('test'), {
            target: { value: 'test 2' },
        });

        fireEvent.click(screen.getByText(/save/i));
    });

    it('removes items', async (done) => {
        const store: StoreType = require('../../store').default();
    
        store.subscribe(() => {
            const state = store.getState().projectState;
    
            if (state.currentProject
                && state.currentProject.todoLists.length > 0) {
                const list = state.currentProject.todoLists[0];

                if (list.todoItems.length == 0) {
                    done();
                }
            }
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[ 'projects/1/lists/1' ]}>
                    <Route path='projects/:project_id/lists/:id'>
                        <List />
                    </Route>
                </MemoryRouter>
            </Provider>
        );

        const item = await screen.findByText('test', { selector: 'span' });
        fireEvent.contextMenu(item);

        const deleteButton = await screen.findByText(/delete/i);
        fireEvent.click(deleteButton);
    });
});