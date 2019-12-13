import React, { useState, useCallback, useEffect } from 'react';
import styles from './styles.module.scss';

import { ProjectEntity, UserEntity } from '../../types/Entities';
import { ProjectModel } from '../../types/Models';
import { crudIndex, crudStore } from '../../API';
import SpinnerOverlay from '../SpinnerOverlay';
import ButtonAdd from '../ButtonAdd';
import SidebarProject from '../SidebarProject';

function Sidebar({ user }: { user: UserEntity }) {
    const [ loading, setLoading ] = useState(false);
    const [ projects, setProjects ] = useState<ProjectEntity[]>([]);

    const updateProjects = useCallback(async () => {
        setLoading(true);
        setProjects(await crudIndex('projects'));
        setLoading(false);
    }, [ setProjects, setLoading ]);

    const onAdd = async (name: string) => {
        setLoading(true);
        await crudStore('projects', {
            name: name,
        } as ProjectModel);
        updateProjects();
    };

    useEffect(() => {
        updateProjects();
    }, [ updateProjects ]);

    return (
        <div className={styles.sidebar}>
            { loading ? <SpinnerOverlay /> : null }
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
                <SidebarProject
                    project={project}
                    key={project.id}
                    updateProjects={updateProjects}
                />
            ) }
                <li>
                    <ButtonAdd
                        title="Create a new project"
                        defaultValue="New project"
                        onAdd={onAdd}
                    />
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;