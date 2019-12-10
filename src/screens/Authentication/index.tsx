import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

import { authenticate, signup } from '../../API';

function Authentication({ error, isSignup = false }: {
    error: string,
    isSignup?: boolean,
}) {
    const [ username, setUsername ] = useState<string>(null);
    const [ password, setPassword ] = useState<string>(null);
    const [ passwordConfirmation, setPasswordConfirmation ] = useState<string>(null);

    return (
        <div className={styles.authentication}>
            <h1>{ isSignup ? 'Sign up' : 'Sign in' }</h1>
            <section className={styles.form}>
                { error ?
                <div>{error}</div>
                : null }
                <label>
                    <input
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    <input
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)} />
                </label>
                { isSignup ?
                    <label>
                        <input
                            placeholder="Confirm password"
                            type="password"
                            onChange={(e) => setPasswordConfirmation(e.target.value)} />
                    </label>
                : null }
                <div>
                    <button onClick={() => {
                        if (isSignup)
                            signup(username, password);
                        else
                            authenticate(username, password);
                    }}
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