import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';

import * as classes from './blog.module.scss';
import './blogHtml.scss';

function BlogTemplate({ data }) {
    const frontMatter = data.markdownRemark.frontmatter;

    return (
        <div className={ classes.blogTemplate }>
            <div className={ classes.image }>
                <GatsbyImage image={ frontMatter.thumbnail.childImageSharp.gatsbyImageData } alt={`image of ${frontMatter.title}`} />
            </div>
            <div className={ classes.details }>
                <h1 className={ classes.title }>
                    { frontMatter.title }
                </h1>
                <p className={ classes.date }>
                    { frontMatter.date }
                </p>
            </div>
            <div className='blogHtml' dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </div>
    );
};

export const pageQuery = graphql`
    query BlogFetcherQuery( $slug: String ) {
        markdownRemark(frontmatter: { slug: { eq: $slug }}) {
            html
            frontmatter {
                title
                date
                thumbnail {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
    }
`;

export default BlogTemplate;
