import React from 'react';

import Icon from '../Icon';

import styles from './SimpleAccordion.css'; // eslint-disable-line no-unused-vars


const SimpleAccordion = ({title, children, show = true}) => {
    if (!show) {
        return null;
    }
    return (
        <details styleName="styles.details">
            <summary><span>{title}</span> <Icon value="chevron-accordion" size={10}/></summary>
            <div>{children}</div>
        </details>
    )
};

export default SimpleAccordion;