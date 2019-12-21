import { put, takeEvery, call, select } from 'redux-saga/effects';

import { httpGet, httpPost, httpDelete } from './http';
import { ActionType } from '../types/ActionType';
import { ActionModel } from '../types/Models';
import { ProjectEntity, TodoItemEntity } from '../types/Entities';
import { StateType } from '../reducers';

function* fetchProjects() {
    let res: ProjectEntity[] = yield call(() => httpGet('projects'));

    if (res) {
        yield put({ type: ActionType.SET_PROJECTS, value: res });
    }
}

function* fetchCurrentProject(action?: ActionModel) {
    let id: number = null;

    if (action) {
        id = action.value;
    } else {
        const currentProject = yield select((state: StateType) => state.projectState.currentProject);
        if (currentProject) {
            id = currentProject.id;
        }
    }

    if (!id) return;

    let res: ProjectEntity = yield call(() => httpGet('projects/' + id));

    if (res) {
        yield put({ type: ActionType.SET_CURRENT_PROJECT, value: res });
    }
}

function* createProject(action: ActionModel) {
    yield call(() => httpPost('projects', {
        name: action.value as string,
    }));

    yield call(fetchProjects);
}

function* updateProject(action: ActionModel) {
    const project: ProjectEntity = action.value as ProjectEntity;
    yield call(() => httpPost('projects/' + project.id, project));

    yield call(fetchProjects);
}

function* createTodoList(action: ActionModel) {
    const projectId = yield select((state: StateType) => state.projectState.currentProject.id);
    yield call(() => httpPost('todolists', {
        projectId: projectId,
        name: action.value as string,
    }));

    yield call(fetchCurrentProject);
}

function* createTodoItem(action: ActionModel) {
    yield call(() => httpPost('todoitems', action.value));

    yield call(fetchCurrentProject);
}

function* updateTodoItem(action: ActionModel) {
    const item: TodoItemEntity = action.value as TodoItemEntity;
    yield call(() => httpPost('todoitems/' + item.id, item));

    yield call(fetchCurrentProject);
}

function* deleteTodoItem(action: ActionModel) {
    const item: TodoItemEntity = action.value as TodoItemEntity;
    yield call(() => httpDelete('todoitems/' + item.id));

    yield call(fetchCurrentProject);
}

export default function* root() {
    yield takeEvery(ActionType.FETCH_PROJECTS, fetchProjects);
    yield takeEvery(ActionType.FETCH_CURRENT_PROJECT, fetchCurrentProject);
    
    yield takeEvery(ActionType.CREATE_PROJECT, createProject);
    yield takeEvery(ActionType.UPDATE_PROJECT, updateProject);

    yield takeEvery(ActionType.CREATE_TODO_LIST, createTodoList);

    yield takeEvery(ActionType.CREATE_TODO_ITEM, createTodoItem);
    yield takeEvery(ActionType.UPDATE_TODO_ITEM, updateTodoItem);
    yield takeEvery(ActionType.DELETE_TODO_ITEM, deleteTodoItem);
};