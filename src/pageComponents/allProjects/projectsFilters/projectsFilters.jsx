import React from 'react';
import './projectsFilters.scss';

import { motion } from 'framer-motion';

const listVariants = {
    visible: i => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * .3,
            duration: .3
        }
    }),
    hidden: {
        opacity: 0,
        x: -15
    }
}

const titleVariants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: .3
        }
    },
    hidden: {
        opacity: 0,
        y: -15
    }
}

const getFilters = ( dataArr ) => {
    const res = [];

    dataArr.forEach( project => {
        project.childMarkdownRemark.frontmatter.tags.forEach( tag => {
            if( res.includes(tag) ) return;
            res.push(tag);
        })
    });

    return res;
}

function ProjectsFilters({ dataArr, activeFilters, setActiveFilters, inView }) {
    const togleStateOfFilter = ( filter ) => {
        if ( activeFilters.includes(filter) ) {
            setActiveFilters( oldArr => oldArr.filter( item => item !== filter ));
        } else {
            setActiveFilters( oldArr => ([ filter, ...oldArr ]));
        }
    }

    return (
        <div className='filtersDiv'>
            <motion.h3 
                variants={ titleVariants }
                initial='hidden'
                animate={ inView ? 'visible' : 'hidden' }
                className='filtersDiv_title'>
                Filters
            </motion.h3>
            <div className='filtersDiv_wrapper'>
                {
                    getFilters( dataArr ).map(( filter, i ) => (
                        <motion.button 
                            className={[ 'filter', activeFilters.includes(filter) ? 'acive' : '' ].join(' ')}
                            key={ `button-for-${filter}` }
                            onClick={ _ => togleStateOfFilter(filter) }
                            custom={ i }
                            variants={ listVariants }
                            initial='hidden'
                            animate={ inView ? 'visible' : 'hidden' }
                        >
                            { filter }
                        </motion.button>
                    ))
                }
            </div>
        </div>
    );
};

export default ProjectsFilters;
