import { ActionModel } from '../types/Models';
import { ActionType } from '../types/ActionType';
import { ProjectEntity } from '../types/Entities';

export interface ProjectState {
    projects: ProjectEntity[],
    currentProject: ProjectEntity,
};

let initialState: ProjectState = {
    projects: [],
    currentProject: null,
};
  
export default function projectState(state = initialState, action: ActionModel) {
    const newState = {...state};
    switch (action.type) {
        case ActionType.SET_PROJECTS:
            newState.projects = action.value as ProjectEntity[];
            break;
        case ActionType.SET_CURRENT_PROJECT:
            newState.currentProject = action.value as ProjectEntity;
            break;
        default:
            return state;
    }

    return newState;
};