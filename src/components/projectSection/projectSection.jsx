import React,{ useEffect } from 'react';
import { Link } from 'gatsby';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import * as classes from './projectSection.module.scss';
import ButtonSecondary from '../buttons/buttonSecondry';
import ImageSlider from '../imagesSlider/imageSlider';

const titleVarients = {
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: .3
        }
    },
    hidden: {
        y: -10,
        opacity: 0
    }
};

const bodyVarients = {
    visible: {
        z: 0,
        opacity: 1,
        transition: {
            duration: .3
        }
    },
    hidden: {
        z: -10,
        opacity: 0
    }
};

const linksVarients = {
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: .3
        }
    },
    hidden: {
        y: 10,
        opacity: 0
    }
};

function ProjectSection({ data }) {
    const { ref, inView } = useInView({
        threshold: .5,
        triggerOnce: true
    });
    const animationsControls = useAnimation();

    useEffect( _ => {
        if ( inView ){
            animationsControls.start('visible');
        } else {
            animationsControls.start('hidden');
        }
    },[ inView, animationsControls ]);


    return (
        <div 
            ref={ ref }
            className={ classes.projectSection }>
            <div className={ classes.details }>
                <motion.h2 
                    className={ classes.title }
                    animate={ animationsControls }
                    initial='hidden'
                    variants={ titleVarients }
                >
                    { data.frontmatter.title }
                </motion.h2>
                <motion.div 
                    className={ classes.about } 
                    dangerouslySetInnerHTML={{ __html: data.html }} 
                    animate={ animationsControls }
                    initial='hidden'
                    variants={ bodyVarients }
                />
                <motion.div 
                    className={ classes.links }
                    animate={ animationsControls }
                    initial='hidden'
                    variants={ linksVarients }
                >
                    <a href={ data.frontmatter.websiteAddress } target='_blank' rel='noreferrer'>
                        <ButtonSecondary>
                            Go to project
                        </ButtonSecondary>
                    </a>
                    <Link className={ classes.link } to='/'>
                        Or learn more about this project.
                    </Link>
                </motion.div>
            </div>
            <div className={ classes.sliderSection }>
                <ImageSlider imagesArr={ data.frontmatter.imagesGallery } />
            </div>
        </div>
    );
};

export default ProjectSection;
