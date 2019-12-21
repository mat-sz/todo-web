import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';

import { TodoListEntity } from '../../types/Entities';
import TodoItem from '../TodoItem';
import InlineForm from '../InlineForm';
import { TodoItemModel } from '../../types/Models';
import { ActionType } from '../../types/ActionType';

function TodoList({ list, onUpdate } : { list: TodoListEntity, onUpdate?: () => void }) {
    const dispatch = useDispatch();

    const addItem = useCallback((text: string) => {
        const item: TodoItemModel = {
            todoListId: list.id,
            name: text,
            done: false,
        };
        
        dispatch({ type: ActionType.CREATE_TODO_ITEM, value: item });
    }, [ dispatch, list ]);

    return (
        <div className={styles.list}>
            <h2>{ list.name }</h2>
            <div className={styles.items}>
                { list.todoItems.map((item) =>
                    <TodoItem
                        key={item.id}
                        item={item}
                        onUpdate={onUpdate}
                    />
                ) }
            </div>
            <InlineForm
                defaultValue=""
                saveText="Add"
                onSave={addItem}
            />
        </div>
    );
}

export default TodoList;