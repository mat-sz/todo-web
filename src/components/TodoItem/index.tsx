import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

import { TodoItemEntity } from '../../types/Entities';
import { crudUpdate } from '../../API';

function TodoItem({ item } : { item: TodoItemEntity }) {
    const [ checked, setChecked ] = useState(item.done);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        crudUpdate('todoitems', {
            ...item,
            done: event.target.checked,
        });
    };

    return (
        <div className={classNames(styles.item, {
            [styles.done]: checked
        })}>
            <input type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span>{ item.name }</span>
        </div>
    );
}

export default TodoItem;