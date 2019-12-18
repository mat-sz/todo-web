import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './styles.module.scss';

import { StateType } from '../../reducers';
import Spinner from '../Spinner';

function SpinnerOverlay() {
    const loading = useSelector((state: StateType) => state.applicationState.loading);

    return (
        <div className={classNames(styles.overlay, {
            [styles.hidden]: !loading,
        })}>
            <Spinner />
        </div>
    );
}

export default SpinnerOverlay;