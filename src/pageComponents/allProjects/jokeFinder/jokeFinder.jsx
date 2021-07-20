import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const variants = {
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: .1
        }
    },
    hidden: {
        y: 10,
        opacity: 0
    }
}

const giveCase = ( tagsArr ) => {
    let res;
    if ( tagsArr.includes('react') && tagsArr.includes('angular') ){
        res = 'reactAndAngular';
    } else if ( tagsArr.includes('gatsby') && tagsArr.includes('angular') ){
        res = 'gatsbyAndAngular';
    } else if ( tagsArr.includes('redux') && tagsArr.includes('angular') ){
        res = 'reduxAndAngular';
    } else {
        res = 'defult';
    }
    return res;
}

const JokeFinder = ({ tags, inView }) => {
    const [ errorType, setErrorType ] = useState( giveCase(tags) );
    
    useEffect( _ => {
        setErrorType(giveCase(tags));
    }, [ setErrorType, tags ]);

    return (
        <div>
            {
                errorType === 'reactAndAngular' ? 
                    <motion.div
                        variants= { variants }
                        initial='hidden'
                        animate={ inView ? 'visible' : 'hidden' }
                    >
                        React and angular in same Project! Really!!!
                    </motion.div>
                : null
            }
            {
                errorType === 'gatsbyAndAngular' ? 
                    <motion.div
                        variants= { variants }
                        initial='hidden'
                        animate={ inView ? 'visible' : 'hidden' }
                    >
                        I dont think gatsby is available for angular
                    </motion.div>
                : null
            }
            {
                errorType === 'reduxAndAngular' ? 
                    <motion.div
                        variants= { variants }
                        initial='hidden'
                        animate={ inView ? 'visible' : 'hidden' }
                    >
                        redux and angular! WHAT!!! 
                    </motion.div>
                : null
            }
            {
                errorType === 'defult' ? 
                    <motion.div
                        variants= { variants }
                        initial='hidden'
                        animate={ inView ? 'visible' : 'hidden' }
                    >
                    No projects founded with that tags!
                    </motion.div>
                : null
            }
        </div>
    );
};

export default JokeFinder;
