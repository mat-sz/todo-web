import React from 'react';
import styles from './styles.module.scss';

import Spinner from '../Spinner';

function SpinnerOverlay() {
    return (
        <div className={styles.overlay}>
            <Spinner />
        </div>
    );
}

export default SpinnerOverlay;