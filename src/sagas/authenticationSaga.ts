import { put, takeEvery, call } from 'redux-saga/effects';

import { httpGet, httpPost } from './http';
import { ActionType } from '../types/ActionType';
import { AuthenticationResponseModel, ActionModel, GenericResponseModel } from '../types/Models';

function* authenticate(action: ActionModel) {
    let res: AuthenticationResponseModel = yield call(() => httpPost('auth', action.value));

    if (res.success) {
        yield put({ type: ActionType.SET_TOKEN, value: res.token });
        yield put({ type: ActionType.AUTHENTICATED, value: yield call(() => httpGet('auth')) });
    }
}

function* signup(action: ActionModel) {
    let res: GenericResponseModel = yield call(() => httpPost('auth/signup', action.value));

    if (res.success) {
        yield call(() => authenticate(action));
    }
}

function* deauthenticate() {
    yield put({ type: ActionType.SET_TOKEN, value: null });
    yield put({ type: ActionType.DEAUTHENTICATED });
}

export default function* root() {
    yield takeEvery(ActionType.AUTHENTICATE, authenticate);
    yield takeEvery(ActionType.DEAUTHENTICATE, deauthenticate);
    yield takeEvery(ActionType.SIGNUP, signup);
};