import React, { useState, useCallback, useMemo, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

import { ActionType } from '../../types/ActionType';

function User() {
    const dispatch = useDispatch();
    const [ oldPassword, setOldPassword ] = useState<string>(null);
    const [ password, setPassword ] = useState<string>(null);
    const [ passwordConfirmation, setPasswordConfirmation ] = useState<string>(null);

    const onChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value);
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const onChangePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value);

    const formDisabled = useMemo(() =>
        !oldPassword || !password || password !== passwordConfirmation,
        [ oldPassword, password, passwordConfirmation ]
    );

    const action = useCallback((e: FormEvent) => {
        e.preventDefault();

        if (formDisabled) {
            return;
        }
        
        const model = {
            password: password,
            oldPassword: oldPassword,
        };

        dispatch({ type: ActionType.SET_PASSWORD, value: model });
    }, [ formDisabled, dispatch, oldPassword, password ]);

    return (
        <div className={styles.user}>
            <h1>User</h1>
            <section>
                <h2>Change password</h2>
                <form
                    onSubmit={action}
                    className={styles.form}>
                    <label>
                        <input
                            placeholder="Old password"
                            type="password"
                            onChange={onChangeOldPassword} />
                    </label>
                    <label>
                        <input
                            placeholder="New password"
                            type="password"
                            onChange={onChangePassword} />
                    </label>
                    <label>
                        <input
                            placeholder="Confirm new password"
                            type="password"
                            onChange={onChangePasswordConfirmation} />
                    </label>
                    <div>
                        <button type='submit'
                            disabled={formDisabled}>
                            Set password
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default User;