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
        switch (e.key) {
            case 'Escape':
                cancel();
                break;
        }
    };

    return (
        <form
            className={styles.inlineForm}
            onSubmit={save}>
            <input
                type="text"
                value={value}
                onChange={updateValue}
                onKeyUp={keyUp}
            />
            <button type='submit'>
                { saveText }
            </button>
            { onCancel ?
                <button onClick={cancel}>
                    Cancel
                </button>
            : null }
        </form>
    );
}

export default InlineForm;