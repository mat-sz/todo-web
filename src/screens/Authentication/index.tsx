import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

import { authenticate, signup } from '../../API';

function Authentication({ isSignup = false }: {
    isSignup?: boolean,
}) {
    const [ username, setUsername ] = useState<string>(null);
    const [ password, setPassword ] = useState<string>(null);
    const [ passwordConfirmation, setPasswordConfirmation ] = useState<string>(null);

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const onChangePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value);

    const action = () => {
        if (isSignup)
            signup(username, password);
        else
            authenticate(username, password);
    };

    return (
        <div className={styles.authentication}>
            <h1>{ isSignup ? 'Sign up' : 'Sign in' }</h1>
            <section className={styles.form}>
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
                    <button onClick={action}
                        disabled={!username || !password || (isSignup && password !== passwordConfirmation)}>
                        Sign in
                    </button>
                </div>
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