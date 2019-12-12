import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import styles from './styles.module.scss';
import InlineForm from '../InlineForm';

function AddButton({ title, defaultValue, onAdd }: { title: string, defaultValue: string, onAdd: (value: string) => void }) {
    const [ adding, setAdding ] = useState(false);

    const onSave = (value: string) => {
        setAdding(false);
        onAdd(value);
    };

    const onCancel = () => {
        setAdding(false);
    };

    const startAdding = () => {
        setAdding(true);
    };

    if (adding) {
        return (
            <InlineForm
                defaultValue={defaultValue}
                saveText="Add"
                onSave={onSave}
                onCancel={onCancel}
            />
        )
    }

    return (
        <div className={styles.addButton}>
            <button onClick={startAdding}>
                <MdAdd />
                <span>{ title }</span>
            </button>
        </div>
    );
}

export default AddButton;