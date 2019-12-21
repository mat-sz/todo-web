import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';

import { TodoListEntity } from '../../types/Entities';
import TodoList from '../../components/TodoList';

function List() {
    const params = useParams<{ id?: string }>();

    const [ list, setList ] = useState<TodoListEntity>(null);

    const updateList = useCallback(async () => {
        //setList(await crudShow('todolists', +params.id));
    }, [ setList, params.id ]);

    useEffect(() => {
        if (params.id)
            updateList();
        else
            setList(null);
    }, [ params, updateList, setList ]);

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