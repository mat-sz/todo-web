import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';

import { crudStore } from '../../API';
import ButtonAdd from '../../components/ButtonAdd';
import TodoList from '../../components/TodoList';
import { TodoListModel } from '../../types/Models';
import { ActionType } from '../../types/ActionType';
import { StateType } from '../../reducers';

function Project() {
    const params = useParams<{ id?: string }>();
    const project = useSelector((state: StateType) => state.projectState.currentProject);
    const dispatch = useDispatch();

    const onUpdate = useCallback(() => {
        dispatch({ type: ActionType.FETCH_CURRENT_PROJECT, value: params.id });
    }, [ dispatch, params.id ]);

    const onAdd = async (name: string) => {
        await crudStore('todolists', {
            projectId: project.id,
            name: name,
        } as TodoListModel);
        onUpdate();
    };

    useEffect(() => {
        if (params.id)
            onUpdate();
        else
            dispatch({ type: ActionType.SET_CURRENT_PROJECT, value: null });
    }, [ params.id, dispatch, onUpdate ]);

    if (!project || !project.todoLists) {
        return (
            <div className={styles.project}>
                Please select a project.
            </div>
        );
    }

    return (
        <div className={styles.project}>
            <h1>{ project.name }</h1>
            { project.todoLists.map((list) =>
                <TodoList
                    key={list.id}
                    list={list}
                    onUpdate={onUpdate}
                />
            ) }
            <div>
                <ButtonAdd 
                    title="Add a new task list"
                    defaultValue="New list"
                    onAdd={onAdd}
                />
            </div>
        </div>
    );
}

export default Project;