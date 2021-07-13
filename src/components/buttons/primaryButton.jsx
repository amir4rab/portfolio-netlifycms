import React from 'react';
import { primaryBtn } from './buttonStyles.module.scss';

function PrimaryButton({ children, onClick }) {
    return (
        <button className={ primaryBtn } onClick={ onClick }>
            { children }
        </button>
    );
};

export default PrimaryButton;
