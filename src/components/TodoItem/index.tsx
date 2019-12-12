import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

import { TodoItemEntity } from '../../types/Entities';
import { crudUpdate } from '../../API';
import ButtonMenu from '../ButtonMenu';

function TodoItem({ item } : { item: TodoItemEntity }) {
    const [ checked, setChecked ] = useState(item.done);
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        crudUpdate('todoitems', {
            ...item,
            done: event.target.checked,
        });
    };

    const openMenu = (e: React.SyntheticEvent) => {
        e.preventDefault();
    };

    return (
        <div className={classNames(styles.item, {
            [styles.done]: checked
        })}
            onContextMenu={openMenu}
        >
            <input type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span>{ item.name }</span>
            <ButtonMenu onClick={openMenu} />
        </div>
    );
}

export default TodoItem;