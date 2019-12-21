import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdArrowDropDown } from 'react-icons/md';
import styles from './styles.module.scss';

import { ProjectModel } from '../../types/Models';
import { ActionType } from '../../types/ActionType';
import { StateType } from '../../reducers';
import { crudStore } from '../../API';
import ButtonAdd from '../ButtonAdd';
import SidebarProject from '../SidebarProject';
import Menu from '../Menu';

function Sidebar() {
    const darkTheme = useSelector((state: StateType) => state.settings.darkTheme);
    const user = useSelector((state: StateType) => state.authenticationState.user);
    const projects = useSelector((state: StateType) => state.projectState.projects);
    const dispatch = useDispatch();

    const toggleDarkTheme = useCallback(() => {
        dispatch({ type: ActionType.TOGGLE_DARK_THEME });
    }, [ dispatch ]);

    const deauthenticate = useCallback(() => {
        dispatch({ type: ActionType.DEAUTHENTICATE });
    }, [ dispatch ]);
    
    const [ menuHidden, setMenuHidden ] = useState(true);

    const onAdd = async (name: string) => {
        await crudStore('projects', {
            name: name,
        } as ProjectModel);
    };

    const toggleMenu = () => setMenuHidden(hidden => !hidden);

    return (
        <div className={styles.sidebar}>
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