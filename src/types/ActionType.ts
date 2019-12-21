export enum ActionType {
    // Application state
    SET_ERROR,
    DISMISS_ERROR,
    SET_LOADING,
    SET_TITLE,

    // Authentication state
    AUTHENTICATED,
    DEAUTHENTICATED,

    // Settings
    TOGGLE_DARK_THEME,
    SET_TOKEN,
};