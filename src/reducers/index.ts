import { combineReducers, Store, AnyAction } from 'redux';

import applicationState, { ApplicationState } from './applicationState';
import authenticationState, { AuthenticationState } from './authenticationState';
import settings, { Settings } from './settings';

export type StateType = {
    applicationState: ApplicationState;
    authenticationState: AuthenticationState;
    settings: Settings;
};

export type StoreType = Store<StateType, AnyAction>;

export default combineReducers({
    applicationState,
    authenticationState,
    settings,
});