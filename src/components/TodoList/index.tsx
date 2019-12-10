import React from 'react';
import styles from './styles.module.scss';

import { TodoListEntity } from '../../types/Entities';
import TodoItem from '../TodoItem';
import InlineForm from '../InlineForm';
import { crudStore } from '../../API';
import { TodoItemModel } from '../../types/Models';

function TodoList({ list, onUpdate } : { list: TodoListEntity, onUpdate?: () => void }) {
    return (
        <div className={styles.list}>
            <h2>{ list.name }</h2>
            { list.todoItems.map((item) =>
                <TodoItem item={item} />
            ) }
            <InlineForm
                defaultValue=""
                saveText="Add"
                onSave={async (text) => {
                    await crudStore('todoitems', {
                        todoListId: list.id,
                        name: text,
                        done: false,
                    } as TodoItemModel);
                    if (onUpdate)
                        onUpdate();
                }}
            />
        </div>
    );
}

export default TodoList;