import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

import MenuItem from '../MenuItem';

export interface MenuAction {
    title: string,
    onClick: () => void,
};

function Menu({ actions, hidden }: { actions: MenuAction[], hidden: boolean } ) {
    return (
        <div className={classNames(styles.menu, "menu", {
            [styles.hidden]: hidden,
        })}>
            { actions.map((action, i) => 
                <MenuItem action={action} key={i} />
            ) }
        </div>
    );
}

export default Menu;