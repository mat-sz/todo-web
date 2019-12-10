import React, { useState, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TiChevronRight, TiPlus } from 'react-icons/ti';
import styles from './styles.module.scss';

import { ProjectEntity, UserEntity } from '../../types/Entities';
import { crudIndex, crudStore } from '../../API';
import SpinnerOverlay from '../SpinnerOverlay';

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
                <li key={project.isNew ? "new" : project.id}>
                    { project.isNew ?
                        <div className={styles.newProject}>
                            <input type="text" value={project.name}
                            onChange={(e) => {
                                const name = e.target.value;
                                setProjects(projects => projects.map((p) => {
                                    if (p === project) {
                                        p.name = name;
                                    }

                                    return p;
                                }));
                            }} />
                            <button onClick={async () => {
                                setLoading(true);
                                await crudStore('projects', project);
                                updateProjects();
                            }}>Add</button>
                        </div>
                    :
                        <NavLink to={'/projects/' + project.id} activeClassName={styles.active}>
                            <TiChevronRight />
                            { !project.isBeingRenamed ?
                                <span>{project.name}</span>
                            :
                                <div>
                                    <input type="text" value={project.name} />
                                    <button>Save</button>
                                </div>
                            }
                        </NavLink>
                    }
                </li>
            ) }
                <li>
                    <button onClick={() => {
                        setProjects((projects) => [...projects, {
                            id: -1,
                            name: "New project",
                            isNew: true,
                            isBeingRenamed: true,
                        }])
                    }}>
                        <TiPlus />
                        <span>Create a new project</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;