import React, { useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import styles from './styles.module.scss';

function AddButton({ title, defaultValue, onAdd }: { title: string, defaultValue: string, onAdd: (value: string) => void }) {
    const [ adding, setAdding ] = useState(false);
    const [ value, setValue ] = useState(defaultValue);

    if (adding) {
        return (
            <div className={styles.adding}>
                <input type="text" value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }} />
                <button onClick={async () => {
                    setAdding(false);
                    onAdd(value);
                }}>Add</button>
            </div>
        )
    }

    return (
        <div className={styles.addButton}>
            <button onClick={() => {
                setValue(defaultValue);
                setAdding(true);
            }}>
                <TiPlus />
                <span>{ title }</span>
            </button>
        </div>
    );
}

export default AddButton;