import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdChevronRight } from 'react-icons/md';
import styles from './styles.module.scss';

import { ProjectEntity } from '../../types/Entities';
import ButtonMenu from '../ButtonMenu';

function SidebarProject({ project, updateProjects }: { project: ProjectEntity, updateProjects: () => void }) {
    const [ isBeingRenamed, setIsBeingRenamed ] = useState(false);
    const [ menuHidden, setMenuHidden ] = useState(true);

    const openMenu = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setMenuHidden(hidden => !hidden);
    };

    return (
        <li className={styles.sidebarProject}>
            <NavLink to={'/projects/' + project.id} activeClassName={styles.active}>
                <MdChevronRight />
                { !isBeingRenamed ?
                    <>
                        <span>{ project.name }</span>
                        <ButtonMenu onClick={openMenu} />
                    </>
                :
                    <div>
                        <input type="text" value={project.name} />
                        <button>Save</button>
                    </div>
                }
            </NavLink>
        </li>
    );
}

export default SidebarProject;