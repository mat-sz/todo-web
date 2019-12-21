import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

import { TodoItemEntity } from '../../types/Entities';
import ButtonMenu from '../ButtonMenu';
import Menu from '../Menu';
import InlineForm from '../InlineForm';
import { useDispatch } from 'react-redux';
import { ActionType } from '../../types/ActionType';

function TodoItem({ item, onUpdate } : { item: TodoItemEntity, onUpdate?: () => void }) {
    const dispatch = useDispatch();

    const [ checked, setChecked ] = useState(item.done);
    const [ menuHidden, setMenuHidden ] = useState(true);
    const [ isBeingRenamed, setIsBeingRenamed ] = useState(false);
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        dispatch({ type: ActionType.UPDATE_TODO_ITEM, value: {
            ...item,
            done: event.target.checked,
        }});
    };

    const openMenu = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setMenuHidden(hidden => !hidden);
    };

    const startRenaming = () => {
        setMenuHidden(true);
        setIsBeingRenamed(true);
    };

    const stopRenaming = () => setIsBeingRenamed(false);

    const updateItem = useCallback((name: string) => {
        stopRenaming();

        dispatch({ type: ActionType.UPDATE_TODO_ITEM, value: {
            ...item,
            name: name,
        }});
    }, [ dispatch, item ]);

    const deleteItem = useCallback(() => {
        dispatch({ type: ActionType.DELETE_TODO_ITEM, value: item });
    }, [ dispatch, item ]);

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
            { isBeingRenamed ?
                <InlineForm
                    defaultValue={item.name}
                    onSave={updateItem}
                    onCancel={stopRenaming}
                />
            :
                <span onDoubleClick={startRenaming}>
                    { item.name }
                </span>
            }
            <ButtonMenu onClick={openMenu} />
            <Menu hidden={menuHidden} actions={[
                {
                    title: "Rename",
                    onClick: startRenaming,
                },
                {
                    title: "Delete",
                    onClick: deleteItem,
                }
            ]} />
        </div>
    );
}

export default TodoItem;