import { ActionModel } from '../types/Models';
import { ActionType } from '../types/ActionType';

export interface Settings {
    darkTheme: boolean,
    token: string,
};

let initialState: Settings = {
    darkTheme: false,
    token: null,
};

const savedSettingsSerialized = localStorage.getItem('settings');
if (savedSettingsSerialized) {
    try {
        initialState = JSON.parse(savedSettingsSerialized) as Settings;
    } catch {}
}
  
export default function settings(state = initialState, action: ActionModel) {
    const newState = {...state};
    switch (action.type) {
        case ActionType.TOGGLE_DARK_THEME:
            newState.darkTheme = !newState.darkTheme;
            break;
        case ActionType.SET_TOKEN:
            newState.token = action.value as string;
            break;
        default:
            return state;
    }

    localStorage.setItem('settings', JSON.stringify(newState));

    return newState;
};