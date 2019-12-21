import { put, call, select } from 'redux-saga/effects';

import Config from '../Config';
import { ActionType } from '../types/ActionType';
import { StateType } from '../reducers';

let url = Config.url;

function tryJson(response: Response) {
    try {
        return response.json();
    } catch {
        return Promise.resolve(null);
    }
}

let activeRequests = 0;
export function* http(method: string, action: string, body?: FormData|string) {
    activeRequests++;
    yield put({ type: ActionType.SET_LOADING, value: true });
    const token = yield select((state: StateType) => state.settings.token);

    let res = yield call(() => fetch(url + action, {
        body: body,
        method: method,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': typeof body === 'string' ? 'application/json' : null,
            'Accept': 'application/json',
        }
    }));

    activeRequests--;

    if (activeRequests < 0) {
        // Should never happen, but let's protect ourselves against that.
        activeRequests = 0;
    }

    yield put({ type: ActionType.SET_LOADING, value: activeRequests !== 0 });

    return res;
}

export function* httpGet(action: string) {
    let res = yield call(() => http('GET', action));
    
    return yield call(() => tryJson(res));
}

export function* httpPost(action: string, data: any) {
    let res = yield call(() => http('POST', action, JSON.stringify(data)));

    return yield call(() => tryJson(res));
}

export function* httpDelete(action: string) {
    let res = yield call(() => http('DELETE', action));

    return yield call(() => tryJson(res));
}