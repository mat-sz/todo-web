import React, { useState, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TiChevronRight } from 'react-icons/ti';
import styles from './styles.module.scss';

import { ProjectEntity, UserEntity } from '../../types/Entities';
import { crudIndex, crudStore } from '../../API';
import SpinnerOverlay from '../SpinnerOverlay';
import AddButton from '../AddButton';
import { ProjectModel } from '../../types/Models';

function Sidebar({ user }: { user: UserEntity }) {
    const [ loading, setLoading ] = useState(false);
    const [ projects, setProjects ] = useState<ProjectEntity[]>([]);

    const updateProjects = useCallback(async () => {
        setLoading(true);
        setProjects(await crudIndex('projects'));
        setLoading(false);
    }, [ setProjects, setLoading ]);

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
                <li key={project.id}>
                    <NavLink to={'/projects/' + project.id} activeClassName={styles.active}>
                        <TiChevronRight />
                        { !project.isBeingRenamed ?
                            <span>{ project.name }</span>
                        :
                            <div>
                                <input type="text" value={project.name} />
                                <button>Save</button>
                            </div>
                        }
                    </NavLink>
                </li>
            ) }
                <li>
                    <AddButton
                        title="Create a new project"
                        defaultValue="New project"
                        onAdd={async (name) => {
                            setLoading(true);
                            await crudStore('projects', {
                                name: name,
                            } as ProjectModel);
                            updateProjects();
                        }}
                    />
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;