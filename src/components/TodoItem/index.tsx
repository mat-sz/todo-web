import React from 'react';
import styles from './styles.module.scss';

import { TodoItemEntity } from '../../types/Entities';

function TodoItem({ item } : { item: TodoItemEntity }) {
    return (
        <div className={styles.item}>
            <input type="checkbox" />
            <span>{ item.name }</span>
        </div>
    );
}

export default TodoItem;