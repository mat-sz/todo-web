import { fork } from 'redux-saga/effects';

import applicationSaga from './applicationSaga';
import authenticationSaga from './authenticationSaga';
import projectSaga from './projectSaga';

export default function* root() {
    yield fork(applicationSaga);
    yield fork(authenticationSaga);
    yield fork(projectSaga);
};