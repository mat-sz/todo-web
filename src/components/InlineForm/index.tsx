import React, { useState } from 'react';
import styles from './styles.module.scss';

function InlineForm({ defaultValue, onSave, onCancel, saveText = 'Save' }: { defaultValue: string, onSave: (value: string) => void, onCancel?: () => void, saveText?: string }) {
    const [ value, setValue ] = useState(defaultValue);

    return (
        <div className={styles.inlineForm}>
            <input type="text" value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }} />
            { onCancel ?
                <button onClick={async () => {
                    setValue('');
                    onCancel();
                }}>Cancel</button>
            : null }
            <button onClick={async () => {
                setValue('');
                onSave(value);
            }}>{ saveText }</button>
        </div>
    );
}

export default InlineForm;