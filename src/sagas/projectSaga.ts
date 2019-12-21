import { put, takeEvery, call } from 'redux-saga/effects';

import { httpGet } from './http';
import { ActionType } from '../types/ActionType';
import { ActionModel } from '../types/Models';
import { ProjectEntity } from '../types/Entities';

function* fetchProjects() {
    let res: ProjectEntity[] = yield call(() => httpGet('projects'));

    if (res) {
        yield put({ type: ActionType.SET_PROJECTS, value: res });
    }
}

function* fetchCurrentProject(action: ActionModel) {
    let res: ProjectEntity = yield call(() => httpGet('projects/' + action.value));

    if (res) {
        yield put({ type: ActionType.SET_CURRENT_PROJECT, value: res });
    }
}

export default function* root() {
    yield takeEvery(ActionType.FETCH_PROJECTS, fetchProjects);
    yield takeEvery(ActionType.FETCH_CURRENT_PROJECT, fetchCurrentProject);
};