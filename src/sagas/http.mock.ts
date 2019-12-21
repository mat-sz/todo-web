import { UserEntity, ProjectEntity, TodoItemEntity } from '../types/Entities';
import { AuthenticationRequestModel, SignupModel, TodoItemModel } from '../types/Models';

module.exports = function () {
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
    
    function* httpGet(action: string) {
        const split = action.split('/').filter((item) => item !== '');
    
        switch (split[0]) {
            case 'auth':
                if (authenticatedUser && 'password' in authenticatedUser) delete authenticatedUser['password'];
                return authenticatedUser;
            case 'projects':
                if (split.length === 1)
                    return projects;
                else
                    return projects.find((project) => project.id == +split[1]);
        }
    }
    
    function* httpPost(action: string, data: any) {
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
            case 'todoitems':
                if (split[1]) {
                    projects = projects.map((project) => {
                        project.todoLists = project.todoLists.map(list => {
                            list.todoItems = list.todoItems.map(item => {
                                if (item.id === +split[1]) {
                                    return {
                                        ...item,
                                        ...data,
                                    } as TodoItemEntity;
                                }

                                return item;
                            });

                            return list;
                        });
        
                        return project;
                    });
                } else {
                    const itemModel: TodoItemModel = data as TodoItemModel;
                    projects = projects.map((project) => {
                        const list = project.todoLists.find(list => list.id === itemModel.todoListId);
                        
                        if (list) {
                            list.todoItems.push({
                                id: Math.floor(Math.random() * 500),
                                name: itemModel.name,
                                done: false,
                            });
                        }
        
                        return project;
                    });
                }
        }
    }
    
    function* httpDelete(action: string) {
        const split = action.split('/').filter((item) => item !== '');
    
        switch (split[0]) {
            case 'todoitems':
                if (split[1]) {
                    projects = projects.map((project) => {
                        project.todoLists = project.todoLists.map(list => {
                            list.todoItems = list.todoItems.filter(item => item.id !== +split[1]);
                            
                            return list;
                        });
        
                        return project;
                    });
                }
        }
    }

    return {
        httpGet,
        httpPost,
        httpDelete,
    };
};