import React, { useEffect, useState, memo } from 'react';
import * as classes from './LanguageBox.module.scss';

import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

import { data as langData } from './langTranslates';

const randomGesser = (max) => {
    return Math.floor(Math.random() * max);
}

const LanguageBox = memo(() => {
    const { ref, inView } = useInView({
        threshold: .5
    });
    const animationControls = useAnimation();
    const [ animatedIn, setAnimatedIn ] = useState(false);
    const [ langDataIndex ] = useState(randomGesser(langData.length));

    const reciversVarients = {
        visible: i => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: (i * 0.3) + 1.3,
            },
        }),
        hidden: {
            x: 10,
            opacity: 0
        }
    }

    console.log(langDataIndex)

    const sendersVarients = {
        visible: i => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: (i * 0.3) + 1,
            },
        }),
        hidden: {
            x: -10,
            opacity: 0
        }
    }

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
        <div ref={ref} className={ classes.languageBox }>
            <motion.div
                className={ classes.firstQuote }
                custom={ 0 }
                animate={ animationControls } 
                initial='hidden'
                variants={ sendersVarients }
            >
                { langData[langDataIndex][0] }
            </motion.div>
            <motion.div 
                custom={ 1 }
                className={ classes.secondQuote }
                animate={ animationControls } 
                initial='hidden'
                variants={ reciversVarients }
            >
                { langData[langDataIndex][1] }
            </motion.div>
        </div>
    );
});

export default LanguageBox;
