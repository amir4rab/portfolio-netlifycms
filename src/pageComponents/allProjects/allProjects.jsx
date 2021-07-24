import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

import * as classes from './allProjects.module.scss';

import ProjectsFilters from './projectsFilters/projectsFilters';
import ProjectSection from '../../components/projectSection/projectSection';
import JokeFinder from './jokeFinder/jokeFinder';

const filterProjects = ( dataArr, filters ) => {
    const res = [];

    dataArr.forEach( project => {
        let includesAll = true;
        filters.every( filter => {
            if ( !project.childMarkdownRemark.frontmatter.tags.includes(filter) || res.includes( project ) ){
                includesAll = false;
                return false;
            } else {
                return true;
            }
        })
        if( includesAll ) res.push(project)
    });

    return res;
};

const intersectionObserverSettings = {
    threshold: .5,
    triggerOnce: true
};

const titleVariants = {
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: .3
        }
    },
    hidden: {
        y: -10,
        opacity: 0,
    }
}

const AllProjectsComponent = ({ location }) => {
    const data = useStaticQuery(graphql`
        query AllProjectsFetcherQuery {
            allFile(
                filter: {sourceInstanceName: {eq: "projects"}}
            ) {
                nodes {
                    childMarkdownRemark {
                        html
                        frontmatter {
                            title
                            websiteAddress
                            github
                            slug
                            tags
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
    const [ activeFilters, setActiveFilters] = useState( 
        location.state === undefined || location.state === null ?
            [] : 
            location.state.preSelectedTag === undefined || location.state.preSelectedTag ? 
                [] : 
                [location.state.preSelectedTag]);

    const [ tilteRef, titleInView ] = useInView(intersectionObserverSettings);

    const [ filterdProjects, setFilterdProjects ] = useState(filterProjects( data.allFile.nodes, activeFilters ));

    useEffect( _ => {
        setFilterdProjects(filterProjects( data.allFile.nodes, activeFilters ));
    }, [ activeFilters, data ]);

    return (
        <div className={ classes.allProjects }>
            <motion.h1 
                ref={ tilteRef }
                className={ classes.title }
                variants={ titleVariants }
                initial='hidden'
                animate={ titleInView ? 'visible' : 'hidden' }
                >
                All projects
            </motion.h1>
            <div className='projectsFilters'>
                <ProjectsFilters 
                    dataArr={ data.allFile.nodes }
                    activeFilters={ activeFilters }
                    setActiveFilters={ setActiveFilters }
                    inView={ titleInView } />
            </div>
            <div className={ classes.details }>
                {
                    filterdProjects.map( projectData => (
                        <ProjectSection 
                            key={ projectData.childMarkdownRemark.frontmatter.title } 
                            data={ projectData.childMarkdownRemark }
                        />
                    ))
                }
                {
                    filterdProjects.length !== 0 ? 
                    null : 
                    <JokeFinder tags={ activeFilters } inView={ titleInView } />
                }
            </div>
        </div>
    );
};

export default AllProjectsComponent;
