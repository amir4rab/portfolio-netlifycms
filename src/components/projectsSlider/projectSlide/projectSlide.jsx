import React, { useEffect } from 'react';
import * as classes from './projectSlide.module.scss';
import { motion, useAnimation } from 'framer-motion';
// import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import ButtonSecondary from '../../buttons/buttonSecondry';

function ProjectSlide({ data, isActive }) {
    const animationControls = useAnimation();
    const phototsAnimationVarients = {
        hidden: {
            x: 10,
            opacity: 0,
        },
        visble: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 1,
                delay: .3
            }
        }
    }

    const buttonAnimationsVarients = {
        hidden: {
            y: +10,
            opacity: 0
        },
        visble: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                delay: .8
            }
        }
    }


    useEffect(_ => {
        let animationTimeOut;
        if ( isActive ) {
            animationControls.start('visble');
        } else {
            animationControls.start('hidden');
        }
        return () => {
            clearTimeout(animationTimeOut);
        }
    }, [ isActive, animationControls ])

    return (
        <div className={ classes.projectSlide }>
            <motion.div animate={ animationControls } initial={ 'hidden' } variants={phototsAnimationVarients} className={ classes.imageArea }>
                { 
                    data.imagesGallery.map((image, i) => 
                        <GatsbyImage 
                            image={ image.childImageSharp.gatsbyImageData } 
                            alt={data.title} 
                            key={`${data.title}-image${i}`}
                            className={ classes.image }
                        />
                    )
                }
            </motion.div>
            <motion.div animate={ animationControls } initial={ 'hidden' } variants={buttonAnimationsVarients} className={ classes.btn }>
                <ButtonSecondary>
                    Go to Project
                </ButtonSecondary>
            </motion.div>
        </div>
    );
};

export default ProjectSlide;
