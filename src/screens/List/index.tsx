import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';

import { ActionType } from '../../types/ActionType';
import { TodoListEntity } from '../../types/Entities';
import TodoList from '../../components/TodoList';
import { StateType } from '../../reducers';

function List() {
    const dispatch = useDispatch();
    const project = useSelector((state: StateType) => state.projectState.currentProject);

    const params = useParams<{ id?: string, project_id?: string }>();

    const [ list, setList ] = useState<TodoListEntity>(null);

    const updateList = useCallback(() => {
        dispatch({ type: ActionType.FETCH_CURRENT_PROJECT, value: params.project_id });
    }, [ params.project_id, dispatch ]);

    useEffect(() => {
        if (params.id)
            updateList();
        else
            setList(null);
    }, [ params, updateList, setList ]);

    useEffect(() => {
        if (project && project.todoLists)
            setList(project.todoLists.find((list) => list.id === +params.id));
        else
            setList(null);
    }, [ project, setList, params.id ])

    if (!list) {
        return (
            <div className={styles.list}>
                Please select a list.
            </div>
        );
    }

    return (
        <div className={styles.list}>
            <h1>{ list.name }</h1>
            <TodoList
                list={list}
                onUpdate={updateList}
            />
        </div>
    );
}

export default List;