import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

import { TodoItemEntity } from '../../types/Entities';
import { crudUpdate, crudDelete } from '../../API';
import ButtonMenu from '../ButtonMenu';
import Menu from '../Menu';

function TodoItem({ item, onUpdate } : { item: TodoItemEntity, onUpdate?: () => void }) {
    const [ checked, setChecked ] = useState(item.done);
    const [ menuHidden, setMenuHidden ] = useState(true);
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        crudUpdate('todoitems', {
            ...item,
            done: event.target.checked,
        });
    };

    const openMenu = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setMenuHidden(hidden => !hidden);
    };

    const deleteItem = async () => {
        await crudDelete('todoitems', item);
        if (onUpdate)
            onUpdate();
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
            <Menu hidden={menuHidden} actions={[
                {
                    title: "Delete",
                    onClick: deleteItem,
                }
            ]} />
        </div>
    );
}

export default TodoItem;