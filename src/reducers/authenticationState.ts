import { ActionModel } from '../types/Models';
import { ActionType } from '../types/ActionType';
import { UserEntity } from '../types/Entities';

export interface AuthenticationState {
    loggedIn: boolean,
    user: UserEntity,
};

let initialState: AuthenticationState = {
    loggedIn: false,
    user: null,
};
  
export default function authenticationState(state = initialState, action: ActionModel) {
    const newState = {...state};
    switch (action.type) {
        case ActionType.SET_LOGGED_IN:
            newState.loggedIn = action.value as boolean;
            break;
        case ActionType.SET_USER:
            newState.user = action.value as UserEntity;
            break;
        default:
            return state;
    }

    return newState;
};