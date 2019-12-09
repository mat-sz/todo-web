import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

import { ProjectEntity, UserEntity } from '../../types/Entities';
import { crudIndex } from '../../API';

function Sidebar({ user }: { user: UserEntity }) {
    const [ projects, setProjects ] = useState<ProjectEntity[]>([]);

    const updateProjects = useCallback(async () => {
        setProjects(await crudIndex('projects'));
    }, [ setProjects ]);

    useEffect(() => {
        updateProjects();
    }, [ updateProjects ]);

    return (
        <div className={styles.sidebar}>
            <ul>
                <li className={styles.title}>User</li>
                <li>{user.username}</li>
            </ul>
            <ul>
                <li className={styles.title}>Projects</li>
            { projects.map((project) => 
                <li>
                    <Link to={'/projects/' + project.id}>
                        {project.name}
                    </Link>
                </li>
            ) }
            </ul>
        </div>
    );
}

export default Sidebar;