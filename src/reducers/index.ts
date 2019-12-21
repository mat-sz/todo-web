import { combineReducers, Store, AnyAction } from 'redux';

import applicationState, { ApplicationState } from './applicationState';
import authenticationState, { AuthenticationState } from './authenticationState';
import projectState, { ProjectState } from './projectState';
import settings, { Settings } from './settings';

export type StateType = {
    applicationState: ApplicationState;
    authenticationState: AuthenticationState;
    projectState: ProjectState;
    settings: Settings;
};

export type StoreType = Store<StateType, AnyAction>;

export default combineReducers({
    applicationState,
    authenticationState,
    projectState,
    settings,
});