import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface MenuAction {
    title: string,
    onClick: () => void,
};

function Menu({ actions, hidden }: { actions: MenuAction[], hidden: boolean } ) {
    return (
        <div className={classNames(styles.menu, {
            [styles.hidden]: hidden,
        })}>
            { actions.map((action, i) => 
                <button
                    key={i}
                    className={styles.menuItem}
                    onClick={action.onClick}
                >
                    {action.title}
                </button>
            ) }
        </div>
    );
}

export default Menu;