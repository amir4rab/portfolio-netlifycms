import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import ImageSlider from '../../components/imagesSlider/imageSlider';

import * as classes from './websiteProject.module.scss';

// animations components
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const intersectionObserverSettings = {
    triggerOnce: true,
    threshold: .9
}

const heroVariants = {
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: .3,
        }
    },
    hidden: {
        opacity: 0,
        scale: .9
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
        y: -10
    }
}

const sliderVariants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: .3
        }
    },
    hidden: {
        opacity: 0,
        y: 10
    }
}

const aboutVariants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: .3
        }
    },
    hidden: {
        opacity: 0,
        y: -10
    }
}

const tagsVariants = {
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
        x: -20
    }
}

const WebsiteProject = ({ data }) => {
    const [ heroRef, heroInView ] = useInView( intersectionObserverSettings );
    const [ titleRef, titleInView ] = useInView( intersectionObserverSettings );
    const [ aboutRef, aboutInView ] = useInView( intersectionObserverSettings );

    console.log(heroInView)

    return (
        <div className={ classes.websiteProject }>
            <motion.div
                variants={ heroVariants }
                ref={ heroRef }
                initial={ 'hidden' }
                animate={ heroInView ? 'visible' : 'hidden' }
                className={ classes.heroImg }>
                <GatsbyImage 
                    image={ data.markdownRemark.frontmatter.thumbnail.childImageSharp.gatsbyImageData } 
                    alt={`hero image for ${ data.markdownRemark.frontmatter.title }`} 
                />
            </motion.div>
            <motion.h1
                ref={ titleRef }
                variants={ titleVariants }
                initial={ 'hidden' }
                animate={ titleInView ? 'visible' : 'hidden' }
                className={ classes.title }>
                { data.markdownRemark.frontmatter.title }
            </motion.h1>
            <div ref={ aboutRef } className={ classes.about }>
                <motion.div 
                    variants={ aboutVariants }
                    initial={ 'hidden' }
                    animate={ aboutInView ? 'visible' : 'hidden' }
                    className={ classes.text }>
                    <h3 className={ classes.subTitle }>
                        About
                    </h3>
                    <div className={ classes.textArea } dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
                    <div className={ classes.Buttons }>
                        <button>
                            <a href={ data.markdownRemark.frontmatter.websiteAddress } target='_blank' rel='noreferrer'>
                                Live website
                            </a>
                        </button>
                        <a href={ data.markdownRemark.frontmatter.github } target='_blank' rel='noreferrer'>
                            Website code
                        </a>
                    </div>
                </motion.div>
                <motion.div 
                    variants={ sliderVariants }
                    initial={ 'hidden' }
                    animate={ aboutInView ? 'visible' : 'hidden' }
                    className={ classes.imgSlider }>
                    <ImageSlider imagesArr={ data.markdownRemark.frontmatter.imagesGallery } />
                </motion.div>
            </div>
            <div className={ classes.tagsSection }>
                <motion.h3 
                    variants={ aboutVariants }
                    initial={ 'hidden' }
                    animate={ aboutInView ? 'visible' : 'hidden' }
                    className={ classes.tagsTitle }>
                    Tags
                </motion.h3>
                <div className={ classes.tags }>
                    {
                        data.markdownRemark.frontmatter.tags.map(( item, i ) => (
                            <motion.div
                                variants={ tagsVariants }
                                custom={ i }
                                initial={ 'hidden' }
                                animate={ aboutInView ? 'visible' : 'hidden' }
                                key={ `${item}-tag` }
                                className={ classes.tag }
                            >
                                <Link to='/allprojects'>
                                    { item }
                                </Link>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default WebsiteProject

export const pageQuery = graphql`
    query( $slug: String ) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            frontmatter {
                title
                github
                tags
                layout
                websiteAddress
                thumbnail {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                specialProject
                slug
                imagesGallery {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
            html
        }
    }
`;