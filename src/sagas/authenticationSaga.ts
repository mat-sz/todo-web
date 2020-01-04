import { put, takeEvery, call, select } from 'redux-saga/effects';

import { httpGet, httpPost } from './http';
import { ActionType } from '../types/ActionType';
import { ActionModel, ResponseModel } from '../types/Models';
import { StateType } from '../reducers';
import { UserEntity } from '../types/Entities';

function* authenticate(action: ActionModel) {
    let res: ResponseModel = yield call(() => httpPost('auth', action.value));

    if (!res.success) return;

    yield put({ type: ActionType.SET_TOKEN, value: res.data });

    let authRes = yield call(() => httpGet('auth'));
    yield put({ type: ActionType.AUTHENTICATED, value: authRes.data });

    yield put({ type: ActionType.FETCH_PROJECTS });
}

function *checkToken() {
    const token = yield select((state: StateType) => state.settings.token);

    if (!token) return;

    const res: ResponseModel = yield call(() => httpGet('auth'));
    const user: UserEntity = res.data;

    if (user) {
        yield put({ type: ActionType.AUTHENTICATED, value: user });

        yield put({ type: ActionType.FETCH_PROJECTS });
    } else {
        yield put({ type: ActionType.SET_TOKEN, value: null });
    }
}

function* signup(action: ActionModel) {
    let res: ResponseModel = yield call(() => httpPost('auth/signup', action.value));

    if (!res.success) return;

    yield call(() => authenticate(action));
}

function* deauthenticate() {
    yield put({ type: ActionType.SET_TOKEN, value: null });
    yield put({ type: ActionType.DEAUTHENTICATED });
}

function* setPassword(action: ActionModel) {
    let res: ResponseModel = yield call(() => httpPost('auth/password', action.value));

    if (!res.success) return;
}

export default function* root() {
    yield call(checkToken);

    yield takeEvery(ActionType.AUTHENTICATE, authenticate);
    yield takeEvery(ActionType.DEAUTHENTICATE, deauthenticate);
    yield takeEvery(ActionType.SIGNUP, signup);
    yield takeEvery(ActionType.SET_PASSWORD, setPassword);
};