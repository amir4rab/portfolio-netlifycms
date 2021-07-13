import React from 'react';

import { secondaryBtn } from './buttonStyles.module.scss';

function ButtonSecondary({ children, onClick }) {
    return (
        <button className={ secondaryBtn } onClick={ onClick }>
            { children }
        </button>
    );
};

export default ButtonSecondary;
