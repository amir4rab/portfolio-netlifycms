import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

import * as classes from './blog.module.scss';

import BlogItem from '../../components/blogItem/blogItem';

const titleVariants = {
    hidden: {
        opacity: 0,
        x: -15
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: .3
        }
    }
};

const BlogComponent = () => {
    const data = useStaticQuery(graphql`
        query FetchBlogsForBlogComponent {
            allFile(filter: {sourceInstanceName: {eq: "blogs"}}, limit: 10) {
                nodes {
                    childMarkdownRemark {
                        frontmatter {
                            title
                            date
                            slug
                            thumbnail {
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
    const [ ref, inView ] = useInView({ triggerOnce: true, threshold: .5 })

    return (
        <div className={ classes.blogComponent }>
            <motion.h1
                ref={ ref }
                variants={ titleVariants }
                initial='hidden'
                animate={ inView ? 'visible' : 'hidden' }
                className={ classes.title }
            >
                Blog
            </motion.h1>
            <div className={ classes.blogItems }>
                {
                    data.allFile.nodes.map(( blog, i ) => <BlogItem key={i} data={ blog.childMarkdownRemark }/>)
                }
            </div>
        </div>
    );
};

export default BlogComponent;
