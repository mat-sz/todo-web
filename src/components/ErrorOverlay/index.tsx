import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import styles from './styles.module.scss';

import { StateType } from '../../reducers';
import { ActionType } from '../../types/ActionType';

function ErrorOverlay() {
    const error = useSelector((state: StateType) => state.applicationState.error);
    const dispatch = useDispatch();

    const onDismiss = useCallback(() => {
        dispatch({ type: ActionType.DISMISS_ERROR });
    }, [ dispatch ]);

    return (
        <div className={classNames(styles.overlay, {
            [styles.hidden]: !error,
        })}>
            <div className={styles.error}>
                <div>
                    { error }
                </div>
                <div className={styles.buttons}>
                    <button onClick={onDismiss}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ErrorOverlay;