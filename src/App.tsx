import React, { useState, useEffect } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import classNames from 'classnames';
import './App.scss';

import * as API from './API';
import SpinnerOverlay from './components/SpinnerOverlay';
import { UserEntity } from './types/Entities';
import Authentication from './screens/Authentication';
import Project from './screens/Project';
import Sidebar from './components/Sidebar';
import List from './screens/List';

const App = () => {
    const [ loading, setLoading ] = useState(true);
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ darkTheme, setDarkTheme ] = useState(false);
    const [ user, setUser ] = useState<UserEntity>(null);
    const [ error, setError ] = useState<string>(null);
    const [ title, setTitle ] = useState('TODO');

    // Behaves like the good old "componentDidMount" when the second argument is an empty array.
    useEffect(() => {
        // API events.
        API.on('authenticated', (user: UserEntity) => {
            setLoading(false);
            setUser(user);
            setLoggedIn(true);
        });
    
        API.on('deauthenticated', () => {
            setLoading(false);
            setLoggedIn(false);
            setUser(null);
        });
    
        API.on('error', (e: string) => {
            setError(e);
        });

        // Check if there's a saved token in our local storage.
        // And verify whether it's correct with the API.
        if (localStorage.getItem('token')) {
            API.checkToken(localStorage.getItem('token'));
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        document.title = title;
    }, [ title ]);

    return (
        <Router>
            <div className={classNames('app', {
                'logged-in': loggedIn,
                'theme-dark': loggedIn && darkTheme,
            })}>
                { loading ?
                    <SpinnerOverlay />
                : null }
                { loggedIn ? 
                    <>
                        <Sidebar
                            darkTheme={darkTheme}
                            setDarkTheme={setDarkTheme}
                            user={user}
                        />
                        <Switch>
                            <Route path="/lists/:id">
                                <List />
                            </Route>
                            <Route path="/projects/:id">
                                <Project />
                            </Route>
                            <Route path="/">

                            </Route>
                        </Switch>
                    </>
                :
                    <Switch>
                        <Route path="/signup">
                            <Authentication error={error} isSignup={true} />
                        </Route>
                        <Route path="/">
                            <Authentication error={error} />
                        </Route>
                    </Switch>
                }
            </div>
        </Router>
    );
}

export default App;
