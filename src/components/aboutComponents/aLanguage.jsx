import React, { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

import { titleVarients, textsVarients, heroVarients } from './framerMotionVarients';
import * as classes from './about.module.scss';
import LanguageBox from '../languageBox/languageBox';

function ALanguage() {
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
        <div ref={ref} className={ classes.aboutSection }>
        <div className={ classes.details }>
            <motion.div
                animate={ animationControls } 
                initial='hidden'
                variants={ titleVarients }
            >
                <h2 className={ classes.title }>
                    Language skills
                </h2>
            </motion.div>
            <div className={ classes.details }>
                <motion.div 
                    animate={ animationControls } 
                    variants={ textsVarients }
                    initial='hidden'
                    custom={ 1 }
                    className={ classes.detail }>
                    <p>
                        English: IELTS Band 7 (estimated)
                    </p>
                </motion.div>
                <motion.div 
                    animate={ animationControls } 
                    variants={ textsVarients }
                    initial='hidden'
                    custom={ 2 }
                    className={ classes.detail }>
                    <p>
                        German: A2 (estimated)
                    </p>
                </motion.div>
                <motion.div 
                    animate={ animationControls } 
                    variants={ textsVarients }
                    initial='hidden'
                    custom={ 3 }
                    className={ classes.detail }>
                    <p>
                        Persian: native
                    </p>
                </motion.div>
            </div>
        </div>
        <motion.div 
            variants={ heroVarients }
            animate={ animationControls } 
            initial='hidden'
            className={ classes.hero }>
            <LanguageBox />
        </motion.div>
    </div>
    );
};

export default ALanguage;
