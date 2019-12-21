import { put, takeEvery, call, select } from 'redux-saga/effects';

import { httpGet, httpPost } from './http';
import { ActionType } from '../types/ActionType';
import { AuthenticationResponseModel, ActionModel, GenericResponseModel } from '../types/Models';
import { StateType } from '../reducers';
import { UserEntity } from '../types/Entities';

function* authenticate(action: ActionModel) {
    let res: AuthenticationResponseModel = yield call(() => httpPost('auth', action.value));

    if (!res.success) return;

    yield put({ type: ActionType.SET_TOKEN, value: res.token });
    yield put({ type: ActionType.AUTHENTICATED, value: yield call(() => httpGet('auth')) });

    yield put({ type: ActionType.FETCH_PROJECTS });
}

function *checkToken() {
    const token = yield select((state: StateType) => state.settings.token);

    if (!token) return;

    let user: UserEntity = yield call(() => httpGet('auth'));

    if (user) {
        yield put({ type: ActionType.AUTHENTICATED, value: user });

        yield put({ type: ActionType.FETCH_PROJECTS });
    } else {
        yield put({ type: ActionType.SET_TOKEN, value: null });
    }
}

function* signup(action: ActionModel) {
    let res: GenericResponseModel = yield call(() => httpPost('auth/signup', action.value));

    if (!res.success) return;

    yield call(() => authenticate(action));
}

function* deauthenticate() {
    yield put({ type: ActionType.SET_TOKEN, value: null });
    yield put({ type: ActionType.DEAUTHENTICATED });
}

export default function* root() {
    yield call(checkToken);

    yield takeEvery(ActionType.AUTHENTICATE, authenticate);
    yield takeEvery(ActionType.DEAUTHENTICATE, deauthenticate);
    yield takeEvery(ActionType.SIGNUP, signup);
};