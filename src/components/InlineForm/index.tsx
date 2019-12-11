import React, { useState } from 'react';
import styles from './styles.module.scss';

function InlineForm({ defaultValue, onSave, onCancel, saveText = 'Save' }: { defaultValue: string, onSave: (value: string) => void, onCancel?: () => void, saveText?: string }) {
    const [ value, setValue ] = useState(defaultValue);

    const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const save = () => {
        setValue('');
        onSave(value);
    };

    const cancel = () => {
        if (onCancel) {
            setValue('');
            onCancel();
        }
    };

    const keyUp = (e: React.KeyboardEvent) => {
        console.log(e.key);
        switch (e.key) {
            case 'Enter':
                save();
                break;
            case 'Escape':
                cancel();
                break;
        }
    };

    return (
        <div className={styles.inlineForm}>
            <input
                type="text"
                value={value}
                onChange={updateValue}
                onKeyUp={keyUp}
            />
            { onCancel ?
                <button onClick={cancel}>
                    Cancel
                </button>
            : null }
            <button onClick={save}>
                { saveText }
            </button>
        </div>
    );
}

export default InlineForm;