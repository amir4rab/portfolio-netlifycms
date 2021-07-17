import React, { useEffect, useState } from 'react';
import TerminalComponent from '../terminal/terminal';

import reactIcon from '../../images/icons/colored/react.svg';
import javascript from '../../images/icons/colored/javascript.svg';
import gatsby from '../../images/icons/colored/gatsby.svg';

import { titleVarients, textsVarients, heroVarients } from './framerMotionVarients';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

import * as classes from './about.module.scss';

function AProgramming() {
    const { ref, inView } = useInView({
        threshold: 0.5
    });
    const animationControls = useAnimation();
    const [ animatedIn, setAnimatedIn ] = useState(false);

    useEffect(_ => {
        if ( animatedIn ) return;
        if ( inView ) {
            animationControls.start('visible');
            setAnimatedIn(true);
        } else {
            animationControls.start('hidden');
        }
    }, [ inView, animationControls, animatedIn, setAnimatedIn ]);

    return (
        <div ref={ ref } className={ classes.aboutSection }>
            <div className={ classes.details }>
                <motion.div
                    animate={ animationControls } 
                    initial='hidden'
                    variants={ titleVarients }
                >
                    <h2 className={ classes.title }>
                        Programing Skills
                    </h2>
                    <p className={ classes.subTitle }>
                        Click to go to projects with that Library / language.
                    </p>
                </motion.div>
                <div className={ classes.details }>
                    <motion.div 
                        animate={ animationControls } 
                        variants={ textsVarients }
                        initial='hidden'
                        custom={ 1 }
                        className={ classes.detail }>
                        <img src={reactIcon} alt='react icon'/>
                        <p>React</p>
                    </motion.div>
                    <motion.div 
                        animate={ animationControls } 
                        variants={ textsVarients }
                        initial='hidden'
                        custom={ 2 }
                        className={ classes.detail }>
                        <img src={gatsby} alt='gatsby icon'/>
                        <p>Gatsby</p>
                    </motion.div>
                    <motion.div 
                        animate={ animationControls } 
                        variants={ textsVarients }
                        initial='hidden'
                        custom={ 3 }
                        className={ classes.detail }>
                        <img src={javascript} alt='javascript icon'/>
                        <p>Javascript</p>
                    </motion.div>
                </div>
            </div>
            <motion.div 
                variants={ heroVarients }
                animate={ animationControls } 
                initial='hidden'
                className={ classes.hero }>
                <TerminalComponent />
            </motion.div>
        </div>
    );
};

export default AProgramming;
