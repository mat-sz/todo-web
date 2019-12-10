import React, { useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import styles from './styles.module.scss';
import InlineForm from '../InlineForm';

function AddButton({ title, defaultValue, onAdd }: { title: string, defaultValue: string, onAdd: (value: string) => void }) {
    const [ adding, setAdding ] = useState(false);

    if (adding) {
        return (
            <InlineForm
                defaultValue={defaultValue}
                saveText="Add"
                onSave={(value) => {
                    setAdding(false);
                    onAdd(value);
                }}
                onCancel={() => {
                    setAdding(false);
                }}
            />
        )
    }

    return (
        <div className={styles.addButton}>
            <button onClick={() => {
                setAdding(true);
            }}>
                <TiPlus />
                <span>{ title }</span>
            </button>
        </div>
    );
}

export default AddButton;