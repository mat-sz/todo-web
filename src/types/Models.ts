export interface AuthenticationRequestModel {
    username: string,
    password: string,
};

export interface AuthenticationResponseModel {
    success: boolean,
    token?: string,
};

export interface PasswordUpdateRequestModel {
    oldPassword: string,
    password: string,
};

export interface ProjectModel {
    name: string,
};

export interface SignupModel {
    username: string,
    password: string,
};

export interface TodoItemModel {
    todoListId: number,
    name: string,
    done: boolean,
};

export interface TodoItemUpdateModel {
    name: string,
    done: boolean,
};

export interface TodoListModel {
    projectId: number,
    name: string,
};

export interface TodoListUpdateModel {
    name: string,
};

export interface GenericResponseModel {
    success: boolean,
    message?: string,
};

export interface ObjectModel {
    id: string|number,
    [x: string]: any,
};