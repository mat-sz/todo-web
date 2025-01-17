import React, { useState, useCallback, useMemo, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

import { ActionType } from '../../types/ActionType';

function Authentication({ isSignup = false }: {
    isSignup?: boolean,
}) {
    const dispatch = useDispatch();
    const [ username, setUsername ] = useState<string>(null);
    const [ password, setPassword ] = useState<string>(null);
    const [ passwordConfirmation, setPasswordConfirmation ] = useState<string>(null);

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const onChangePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value);

    const formDisabled = useMemo(() =>
        !username || !password || (isSignup && password !== passwordConfirmation),
        [ username, password, isSignup, passwordConfirmation ]
    );

    const action = useCallback((e: FormEvent) => {
        e.preventDefault();

        if (formDisabled) {
            return;
        }
        
        const model = {
            username: username,
            password: password
        };

        dispatch({ type: isSignup ? ActionType.SIGNUP : ActionType.AUTHENTICATE, value: model });
    }, [ formDisabled, dispatch, username, password, isSignup ]);

    return (
        <div className={styles.authentication}>
            <h1>{ isSignup ? 'Sign up' : 'Sign in' }</h1>
            <section>
                <form
                    onSubmit={action}
                    className={styles.form}>
                    <label>
                        <input
                            placeholder="Username"
                            onChange={onChangeUsername} />
                    </label>
                    <label>
                        <input
                            placeholder="Password"
                            type="password"
                            onChange={onChangePassword} />
                    </label>
                    { isSignup ?
                        <label>
                            <input
                                placeholder="Confirm password"
                                type="password"
                                onChange={onChangePasswordConfirmation} />
                        </label>
                    : null }
                    <div>
                        <button type='submit'
                            disabled={formDisabled}>
                            { isSignup ? 'Sign up' : 'Sign in' }
                        </button>
                    </div>
                </form>
            </section>
            { isSignup ? 
                <Link to="/">Sign in instead.</Link>
                :
                <Link to="/signup">Need an account?</Link>
            }
        </div>
    );
}

export default Authentication;