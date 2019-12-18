import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

import { StateType } from '../../reducers';
import Spinner from '../Spinner';

function SpinnerOverlay() {
    const loading = useSelector((state: StateType) => state.applicationState.loading);

    if (!loading)
        return null;

    return (
        <div className={styles.overlay}>
            <Spinner />
        </div>
    );
}

export default SpinnerOverlay;