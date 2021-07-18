import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Link } from 'gatsby';
import * as classes from './projects.module.scss';

import ProjectSection from '../projectSection/projectSection';

function ProjectsComponent() {
    const data = useStaticQuery(graphql`
        query SepcialProjectsFetcherQuery {
            allFile(
                filter: {sourceInstanceName: {eq: "projects"}, childMarkdownRemark: {frontmatter: {specialProject: {eq: true}}}}
            ) {
                nodes {
                    childMarkdownRemark {
                        html
                        frontmatter {
                            title
                            websiteAddress
                            github
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

    return (
        <div className={ classes.projects }>
            {
                data.allFile.nodes.map( projectData => 
                    <ProjectSection 
                        key={ projectData.childMarkdownRemark.frontmatter.title } 
                        data={ projectData.childMarkdownRemark } />)
            }
            <div className={ classes.footer }>
                These were the main projects, feel free to check out, rest of them <Link to='/allprojects'>here</Link>.
            </div>
        </div>
    );
};

export default ProjectsComponent;
