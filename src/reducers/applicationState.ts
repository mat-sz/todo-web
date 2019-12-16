import { ActionModel } from '../types/Models';
import { ActionType } from '../types/ActionType';

export interface ApplicationState {
    loading: boolean,
    error: string,
    title: string,
};

let initialState: ApplicationState = {
    loading: false,
    error: null,
    title: 'TODO',
};
  
export default function applicationState(state = initialState, action: ActionModel) {
    const newState = {...state};
    switch (action.type) {
        case ActionType.SET_ERROR:
            newState.error = action.value as string;
            break;
        case ActionType.DISMISS_ERROR:
            newState.error = null;
            break;
        case ActionType.SET_LOADING:
            newState.loading = action.value as boolean;
            break;
        case ActionType.SET_TITLE:
            newState.title = action.value as string;
            break;
        default:
            return state;
    }

    document.title = newState.title;

    return newState;
};