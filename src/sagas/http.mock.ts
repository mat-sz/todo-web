import { put, call, select } from 'redux-saga/effects';

import { UserEntity, ProjectEntity } from '../types/Entities';
import { AuthenticationRequestModel, SignupModel } from '../types/Models';

let authenticatedUser: UserEntity = null;

let userId = 2;
let users: UserEntity[] = [
    {
        id: 1,
        username: 'test',
    }
];

let projectId = 2;
let projects: ProjectEntity[] = [
    {
        id: 1,
        name: 'test',
        todoLists: [
            {
                id: 1,
                name: 'test',
                todoItems: [
                    {
                        id: 1,
                        name: 'test',
                        done: false,
                    }
                ]
            }
        ]
    }
];

export function* httpGet(action: string) {
    const split = action.split('/').filter((item) => item !== '');

    switch (split[0]) {
        case 'auth':
            if ('password' in authenticatedUser) delete authenticatedUser['password'];
            return authenticatedUser;
        case 'projects':
            if (split.length === 1)
                return projects;
            else
                return projects.find((project) => project.id == +split[1]);
    }
}

export function* httpPost(action: string, data: any) {
    const split = action.split('/').filter((item) => item !== '');

    switch (split[0]) {
        case 'auth':
            if (split[1] && split[1] === 'signup') {
                const signupModel: SignupModel = data as SignupModel;
                users.push({
                    ...signupModel,
                    id: userId,
                });
                userId++;
    
                return {
                    success: true,
                };
            }

            const model: AuthenticationRequestModel = data as AuthenticationRequestModel;
            if (model.password === 'test') {
                
                authenticatedUser = users.find((user) => user.username === model.username);
                if (authenticatedUser) {
                    return {
                        success: true,
                        token: 'test',
                    };
                }
            }

            return {
                success: false,
            };
        case 'projects':
            data.id = projectId;
            projectId++;
            projects.push(data);
            return {
                success: true
            };
    }
}

export function* httpDelete(action: string) {
    const split = action.split('/').filter((item) => item !== '');
}