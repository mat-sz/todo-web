import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './styles.module.scss';

import { crudShow, crudStore } from '../../API';
import { ProjectEntity } from '../../types/Entities';
import ButtonAdd from '../../components/ButtonAdd';
import TodoList from '../../components/TodoList';
import { TodoListModel } from '../../types/Models';

function Project() {
    const params = useParams<{ id?: string }>();

    const [ project, setProject ] = useState<ProjectEntity>(null);

    const updateProject = useCallback(async () => {
        setProject(await crudShow('projects', +params.id));
    }, [ setProject, params.id ]);

    const onAdd = async (name: string) => {
        await crudStore('todolists', {
            projectId: project.id,
            name: name,
        } as TodoListModel);
        updateProject();
    };

    useEffect(() => {
        if (params.id)
            updateProject();
        else
            setProject(null);
    }, [ params, updateProject, setProject ]);

    if (!project) {
        return (
            <div className={styles.project}>
                Please select a project.
            </div>
        );
    }

    return (
        <div className={styles.project}>
            <h1>{ project.name }</h1>
            { project.todoLists.map((list) =>
                <TodoList
                    key={list.id}
                    list={list}
                    onUpdate={updateProject}
                />
            ) }
            <div>
                <ButtonAdd 
                    title="Add a new task list"
                    defaultValue="New list"
                    onAdd={onAdd}
                />
            </div>
        </div>
    );
}

export default Project;