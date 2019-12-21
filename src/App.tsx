import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import './App.scss';

import { StateType } from './reducers';
import SpinnerOverlay from './components/SpinnerOverlay';
import Authentication from './screens/Authentication';
import Project from './screens/Project';
import Sidebar from './components/Sidebar';
import List from './screens/List';

const App = () => {
    const darkTheme = useSelector((state: StateType) => state.settings.darkTheme);
    const loggedIn = useSelector((state: StateType) => state.authenticationState.loggedIn);

    return (
        <Router>
            <div className={classNames('app', {
                'logged-in': loggedIn,
                'theme-dark': loggedIn && darkTheme,
            })}>
                <SpinnerOverlay />
                { loggedIn ? 
                    <>
                        <Sidebar />
                        <Switch>
                            <Route path="/projects/:project_id/lists/:id">
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
                            <Authentication isSignup={true} />
                        </Route>
                        <Route path="/">
                            <Authentication />
                        </Route>
                    </Switch>
                }
            </div>
        </Router>
    );
}

export default App;
