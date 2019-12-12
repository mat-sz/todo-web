import React, { useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import styles from './styles.module.scss';

function ButtonMenu({ onClick }: { onClick: (e: React.SyntheticEvent) => void }) {
    return (
        <button
            onClick={onClick}
            className={styles.buttonMenu}
        >
            <MdMoreHoriz />
        </button>
    );
}

export default ButtonMenu;