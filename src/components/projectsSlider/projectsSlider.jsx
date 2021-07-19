import React, { useState, useCallback, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { motion } from 'framer-motion';

import * as classes from './projectsSlider.module.scss';

import ProjectSlide from './projectSlide/projectSlide';
import Indicators from './indicators/indicators';

function ProjectsSlider() {
    const data = useStaticQuery(graphql`
        query ProjectsSliderFetcher {
            allFile(
                filter: {sourceInstanceName: {eq: "projects"}, childMarkdownRemark: {frontmatter: {specialProject: {eq: true}}}}
            ) {
                nodes {
                    childMarkdownRemark {
                        frontmatter {
                            title
                            slug
                            imagesGallery {
                                childImageSharp {
                                    gatsbyImageData
                                }
                            }
                        }
                    }
                }
            }
        }
    `);
    const [ sliderPostion, setSliderPostion ] = useState(0);
    const [ sliderPostionProxy, setSliderPostionProxy ] = useState(0);

    useEffect( _ => {
        if ( sliderPostion === sliderPostionProxy ) return;
        const setterTimeout = setTimeout( _ => {
            setSliderPostion(sliderPostionProxy);
        }, 300);
        return () => {
            clearTimeout( setterTimeout );
        }
    },[ sliderPostionProxy, sliderPostion ]);
    const setSliderPostionFn = useCallback((i) => setSliderPostionProxy(i),[]);

    return (
        <div className={ classes.projectsSlider }>
            <div 
                style={{
                    transform:`translateY(${ -85 * sliderPostion }vh)`
                }}
            >
                {
                    data.allFile.nodes.map(( node, i ) => 
                        <ProjectSlide 
                            data={node.childMarkdownRemark.frontmatter} 
                            key={`slide-${node.childMarkdownRemark.frontmatter.title}`}
                            isActive={ i === sliderPostionProxy }
                        />)
                }
            </div>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: .2, duration: 1 }}
                className={ classes.indicatorsDiv }>
                <Indicators activeIndex={ sliderPostionProxy } len={ data.allFile.nodes.length } setIndex={ setSliderPostionFn } />
            </motion.div>
        </div>
    )
}

export default ProjectsSlider
