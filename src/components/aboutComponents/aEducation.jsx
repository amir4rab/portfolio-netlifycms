import React, { useEffect, useState } from 'react';
import * as classes from './about.module.scss';

import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

import { titleVarients, textsVarients, heroVarients } from './framerMotionVarients';
import educationImg from '../../images/education.svg';

function AEducation() {
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
                        Academic educations
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
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias architecto ducimus ipsa excepturi totam rerum nesciunt sit! Vel nostrum cupiditate, cumque culpa maxime fugit ex, quidem error, nisi voluptas perspiciatis.
                        </p>
                    </motion.div>
                </div>
            </div>
            <motion.div 
                variants={ heroVarients }
                animate={ animationControls } 
                initial='hidden'
                className={ classes.hero }>
                <img src={educationImg} className={ classes.heroImg } alt="educationImg" />
            </motion.div>
        </div>
    );
};

export default AEducation;
