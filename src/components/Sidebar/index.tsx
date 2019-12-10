import React, { useState, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TiChevronRight } from 'react-icons/ti';
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
            <div className={styles.user}>
                <div className={styles.avatar}>
                    {user.username[0].toUpperCase()}
                </div>
                <div className={styles.username}>
                    {user.username}
                </div>
            </div>
            <ul>
                <li className={styles.title}>Projects</li>
            { projects.map((project) => 
                <li>
                    <NavLink to={'/projects/' + project.id} activeClassName={styles.active}>
                        <TiChevronRight />
                        <span>{project.name}</span>
                    </NavLink>
                </li>
            ) }
            </ul>
        </div>
    );
}

export default Sidebar;