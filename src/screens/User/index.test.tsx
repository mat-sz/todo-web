import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';

import User from './';
import { StoreType } from '../../reducers';

describe('user', () => {
    beforeEach(() => {
        jest.mock('../../sagas/http', () => require('../../sagas/http.mock')());
    });

    afterEach(() => {
        jest.resetModules();
    });
});