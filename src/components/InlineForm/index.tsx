import React, { useState, useCallback, FormEvent } from 'react';
import styles from './styles.module.scss';

function InlineForm({ defaultValue, onSave, onCancel, saveText = 'Save' }: { defaultValue: string, onSave: (value: string) => void, onCancel?: () => void, saveText?: string }) {
    const [ value, setValue ] = useState(defaultValue);

    const updateValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, [ setValue ]);

    const save = useCallback(() => {
        setValue('');
        onSave(value);
    }, [ setValue, onSave, value ]);

    const cancel = useCallback(() => {
        if (onCancel) {
            setValue('');
            onCancel();
        }
    }, [ setValue, onCancel ]);

    const submit = useCallback((e: FormEvent) => {
        e.preventDefault();
        save();
    }, [ save ]);

    const keyUp = useCallback((e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Escape':
                cancel();
                break;
        }
    }, [ cancel ]);

    return (
        <form
            className={styles.inlineForm}
            onSubmit={submit}>
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