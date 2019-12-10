import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './styles.module.scss';

import { crudShow, crudStore } from '../../API';
import { ProjectEntity } from '../../types/Entities';
import SpinnerOverlay from '../../components/SpinnerOverlay';
import AddButton from '../../components/AddButton';
import TodoList from '../../components/TodoList';
import { TodoListModel } from '../../types/Models';

function Project() {
    const params = useParams<{ id?: string }>();

    const [ loading, setLoading ] = useState(false);
    const [ project, setProject ] = useState<ProjectEntity>(null);

    const updateProject = useCallback(async (id: number) => {
        setLoading(true);
        setProject(await crudShow('projects', id));
        setLoading(false);
    }, [ setProject ])

    useEffect(() => {
        if (params.id)
            updateProject(+params.id);
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
            { loading ? <SpinnerOverlay /> : null }
            <h1>{ project.name }</h1>
            { project.todoLists.map((list) =>
                <TodoList
                    list={list}
                    onUpdate={() => {
                        updateProject(project.id);
                    }}
                />
            ) }
            <div>
                <AddButton 
                    title="Add a new task list"
                    defaultValue="New list"
                    onAdd={async (name) => {
                        setLoading(true);
                        await crudStore('todolists', {
                            projectId: project.id,
                            name: name,
                        } as TodoListModel);
                        updateProject(project.id);
                    }}
                />
            </div>
        </div>
    );
}

export default Project;