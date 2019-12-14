import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';

import { crudShow } from '../../API';
import { TodoListEntity } from '../../types/Entities';
import SpinnerOverlay from '../../components/SpinnerOverlay';
import TodoList from '../../components/TodoList';

function List() {
    const params = useParams<{ id?: string }>();

    const [ loading, setLoading ] = useState(false);
    const [ list, setList ] = useState<TodoListEntity>(null);

    const updateList = useCallback(async () => {
        setLoading(true);
        setList(await crudShow('todolists', +params.id));
        setLoading(false);
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
            { loading ? <SpinnerOverlay /> : null }
            <h1>{ list.name }</h1>
            <TodoList
                list={list}
                onUpdate={updateList}
            />
        </div>
    );
}

export default List;