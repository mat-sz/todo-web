import React from 'react';
import styles from './styles.module.scss';

function Spinner() {
    return (
        <div className={styles.spinner}>
            {new Array(12).fill(null).map((_, i) => <div key={i} />)}
        </div>
    );
}

export default Spinner;