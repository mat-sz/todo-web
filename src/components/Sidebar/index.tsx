import React, { useState, useCallback, useEffect } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import styles from './styles.module.scss';

import { ProjectEntity, UserEntity } from '../../types/Entities';
import { ProjectModel } from '../../types/Models';
import { crudIndex, crudStore, deauthenticate } from '../../API';
import SpinnerOverlay from '../SpinnerOverlay';
import ButtonAdd from '../ButtonAdd';
import SidebarProject from '../SidebarProject';
import Menu from '../Menu';

function Sidebar({ user, darkTheme, setDarkTheme }: { user: UserEntity, darkTheme: boolean, setDarkTheme: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [ loading, setLoading ] = useState(false);
    const [ menuHidden, setMenuHidden ] = useState(true);
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

    const toggleMenu = () => setMenuHidden(hidden => !hidden);
    const toggleDarkTheme = () => setDarkTheme(darkTheme => !darkTheme);

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
                <button className={styles.username} onClick={toggleMenu}>
                    {user.username} <MdArrowDropDown />
                </button>
                <Menu
                    actions={[
                        {
                            title: darkTheme ? 'Light theme' : 'Dark theme',
                            onClick: toggleDarkTheme,
                        },
                        {
                            title: 'Log out',
                            onClick: deauthenticate,
                        },
                    ]}
                    hidden={menuHidden}
                />
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