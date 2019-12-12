import React from 'react';
import styles from './styles.module.scss';

import { TodoListEntity } from '../../types/Entities';
import TodoItem from '../TodoItem';
import InlineForm from '../InlineForm';
import { crudStore } from '../../API';
import { TodoItemModel } from '../../types/Models';

function TodoList({ list, onUpdate } : { list: TodoListEntity, onUpdate?: () => void }) {
    const addItem = async (text: string) => {
        await crudStore('todoitems', {
            todoListId: list.id,
            name: text,
            done: false,
        } as TodoItemModel);
        if (onUpdate)
            onUpdate();
    };

    return (
        <div className={styles.list}>
            <h2>{ list.name }</h2>
            <div className={styles.items}>
                { list.todoItems.map((item) =>
                    <TodoItem
                        key={item.id}
                        item={item}
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