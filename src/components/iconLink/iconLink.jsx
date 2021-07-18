import React from 'react';
import Logo from '../../images/logo.svg';

import { motion, useAnimation } from 'framer-motion';

import * as classes from './iconLink.module.scss';

function IconLink() {
    const animationControls = useAnimation();
    const varinets = {
        visible: {
            x: 10,
            opacity: 1,
            transition: { duration: .3 }
        },
        hidden: {
            x: -10,
            opacity: 0,
            transition: { 
                duration: .3,
                delay: .1
            }
        }
    };


    return (
        <div 
            onMouseEnter={ _ => animationControls.start('visible') }
            onMouseLeave={ _ => animationControls.start('hidden') }
            className={ classes.iconLink }
            aria-hidden='true'
        >
            <img src={Logo} alt="website logo" />
            <motion.div
                variants={ varinets }
                initial='hidden'
                animate={ animationControls }
                className={ classes.hiddenLink }
            >
                Logo designed by <a href='https://www.instagram.com/mwlpixel/' rel='noreferrer' target='_blank' >@mwlpixel</a>.
            </motion.div>
        </div>
    );
};

export default IconLink;
