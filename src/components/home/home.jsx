import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image"

function HomeComponent() {
    const data = useStaticQuery(graphql`
        query MyQuery {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            imagesGallery {
                                image {
                                    childImageSharp {
                                        gatsbyImageData
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    const imgArr = data.allMarkdownRemark.edges[0].node.frontmatter.imagesGallery;

    console.log(imgArr);

    return (
        <div>
            hekki13
            {
                imgArr.map((data, i) =>
                    <GatsbyImage image={data.image.childImageSharp.gatsbyImageData} alt={`img${i}`} key={`img${i}`} />
                )
            } 
        </div>
    );
};

export default HomeComponent;
