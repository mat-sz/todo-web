import React from 'react';
import styles from './styles.module.scss';

import { MenuAction } from '../Menu';

function MenuItem({ action }: { action: MenuAction } ) {
    return (
        <button
            className={styles.menuItem}
            onClick={action.onClick}
        >
            {action.title}
        </button>
    );
}

export default MenuItem;