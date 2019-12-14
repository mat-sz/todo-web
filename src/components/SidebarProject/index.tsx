import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdChevronRight } from 'react-icons/md';
import classNames from 'classnames';
import styles from './styles.module.scss';

import { ProjectEntity } from '../../types/Entities';
import ButtonMenu from '../ButtonMenu';
import Menu from '../Menu';
import InlineForm from '../InlineForm';
import { crudUpdate } from '../../API';

function SidebarProject({ project, updateProjects }: { project: ProjectEntity, updateProjects: () => void }) {
    const [ isBeingRenamed, setIsBeingRenamed ] = useState(false);
    const [ menuHidden, setMenuHidden ] = useState(true);
    const [ listsHidden, setListsHidden ] = useState(true);

    const openMenu = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setMenuHidden(hidden => !hidden);
    };

    const startRenaming = () => {
        setMenuHidden(true);
        setIsBeingRenamed(true);
    };
    const stopRenaming = () => setIsBeingRenamed(false);

    const renameProject = async (name: string) => {
        stopRenaming();

        await crudUpdate('projects', {
            ...project,
            name: name,
        });

        updateProjects();
    };

    const toggleLists = (e: React.SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setListsHidden(listsHidden => !listsHidden);
    };

    return (
        <li className={styles.sidebarProject}>
            { !isBeingRenamed ?
                <NavLink to={'/projects/' + project.id} activeClassName={styles.active}>
                    <button
                        className={classNames(styles.chevron, {
                            [styles.chevronOpen]: !listsHidden,
                        })}
                        onClick={toggleLists}
                    >
                        <MdChevronRight />
                    </button>
                    <span onDoubleClick={startRenaming}>
                        { project.name }
                    </span>
                    <ButtonMenu onClick={openMenu} />
                    <Menu hidden={menuHidden} actions={[
                        {
                            title: "Rename",
                            onClick: startRenaming,
                        },
                    ]} />
                </NavLink>
            :
                <InlineForm
                    defaultValue={project.name}
                    onSave={renameProject}
                    onCancel={stopRenaming}
                />
            }
            <ul className={classNames(styles.lists, {
                [styles.hidden]: listsHidden,
            })}>
                { project.todoLists.map((todoList) =>
                    <li key={todoList.id}>
                        <NavLink to={'/lists/' + todoList.id} activeClassName={styles.active}>
                            <span>
                                {todoList.name}
                            </span>
                        </NavLink>
                    </li>
                ) }
            </ul>
        </li>
    );
}

export default SidebarProject;