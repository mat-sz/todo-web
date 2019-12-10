import React from 'react';
import styles from './styles.module.scss';

import { TodoListEntity } from '../../types/Entities';

function TodoList({ list } : { list: TodoListEntity }) {
    return (
        <div className={styles.list}>
            <h2>{ list.name }</h2>
        </div>
    );
}

export default TodoList;