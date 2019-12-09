export interface Entity {
    id: number,
    createdAt: Date,
    updatedAt: Date,
}

export interface TodoItemEntity extends Entity {
    name: string,
    done: boolean,
};

export interface TodoListEntity extends Entity {
    name: string,
    todoItems: TodoItemEntity[],
};

export interface ProjectEntity extends Entity {
    name: string,
    todoLists: TodoListEntity[],
};

export interface UserEntity extends Entity {
    username: string,
};