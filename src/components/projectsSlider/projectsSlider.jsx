import React, { useState, useCallback } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import * as classes from './projectsSlider.module.scss';

import ProjectSlide from './projectSlide/projectSlide';
import Indicators from './indicators/indicators';

function ProjectsSlider() {
    const data = useStaticQuery(graphql`
        query ProjectsSliderFetcher {
            allMarkdownRemark {
                nodes {
                    frontmatter {
                        title
                        imagesGallery {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                    }
                }
            }
        }
    `);
    const [ sliderPostion, setSliderPostion ] = useState(0);

    const setSliderPostionFn = useCallback((i) => setSliderPostion(i),[]);

    return (
        <div className={ classes.projectsSlider }>
            <div 
                style={{
                    transform:`translateY(${ -90 * sliderPostion }vh)`
                }}
                className={ classes.inner }
            >
                {
                    data.allMarkdownRemark.nodes.map(( node, i ) => 
                        <ProjectSlide 
                            data={node.frontmatter} 
                            key={`slide-${node.frontmatter.title}`}
                            isActive={ i === sliderPostion }
                        />)
                }
            </div>
            <div className={ classes.indicatorsDiv }>
                <Indicators activeIndex={sliderPostion} len={ data.allMarkdownRemark.nodes.length } setIndex={ setSliderPostionFn } />
            </div>
        </div>
    )
}

export default ProjectsSlider
