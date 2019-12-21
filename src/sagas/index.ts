import { fork } from 'redux-saga/effects';

import authenticationSaga from './authenticationSaga';
import projectSaga from './projectSaga';

export default function* root() {
    yield fork(authenticationSaga);
    yield fork(projectSaga);
};