import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

import * as classes from './blogItem.module.scss';

const variants = {
    hidden: {
        opacity: 0,
        y: -10
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: .3
        }
    }
}

const BlogItem = ({ data }) => {
    const [ ref, inView ] = useInView({
        triggerOnce: true,
        threshold: .75
    })
    const date = new Date(data.frontmatter.date);

    return (
        <motion.div 
            ref= { ref }
            variants= { variants }
            initial='hidden'
            animate={ inView ? 'visible' : 'hidden' }
            className={ classes.blogItem }>
            <div className={ classes.image }>
                <GatsbyImage image={ data.frontmatter.thumbnail.childImageSharp.gatsbyImageData } alt={ `image of ${data.frontmatter.title}` } />
            </div>
            <div className={ classes.title }>
                <Link to={`/blog/${data.frontmatter.slug}`}>
                    { data.frontmatter.title }
                </Link>
            </div>
            <div className={ classes.date }>
                { `${date.getFullYear()} / ${date.getMonth()} / ${date.getDate()}`}
            </div>
        </motion.div>
    );
};

export default BlogItem;
