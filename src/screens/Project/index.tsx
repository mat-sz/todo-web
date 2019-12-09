import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './styles.module.scss';

import { crudShow } from '../../API';
import { ProjectEntity } from '../../types/Entities';

function Project() {
    const params = useParams<{ id?: string }>();
    const [ project, setProject ] = useState<ProjectEntity>(null);
    const updateProject = useCallback(async (id: number) => {
        setProject(await crudShow('projects', id));
    }, [ setProject ])

    useEffect(() => {
        if (params.id)
            updateProject(+params.id);
        else
            setProject(null);
    }, [ params, updateProject, setProject ]);

    return (
        <div className={styles.project}>
            <h1>{ project ? project.name : 'Please select a project.' }</h1>
        </div>
    );
}

export default Project;