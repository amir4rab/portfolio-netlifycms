const path = require(`path`)
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
    reporter.info(`Your Gatsby site has been built!`)
};

// Create blog pages dynamically
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const websiteProjectTemplate = path.resolve(`src/templates/websiteProject/websiteProject.jsx`);
    const blogTemplate = path.resolve(`src/templates/blog/blogTemplate.jsx`);

    const projects = graphql(`
        query ProjectsQueryForNodeCreation {
            allFile(filter: {sourceInstanceName: {eq: "projects"}}) {
                edges {
                    node {
                        childMarkdownRemark {
                            frontmatter {
                                slug
                                title
                            }
                        }
                    }
                }
            }
        }
    `).then( result => {
        result.data.allFile.edges.forEach(edge => {
            createPage({
                path: `projects/${edge.node.childMarkdownRemark.frontmatter.slug}`,
                component: websiteProjectTemplate,
                context: {
                    slug: edge.node.childMarkdownRemark.frontmatter.slug,
                },
            })
        })
    });

    const blogs = graphql(`
        query FetchBlogsForBlogComponent {
            allFile(filter: {sourceInstanceName: {eq: "blogs"}}) {
                edges {
                    node {
                        childMarkdownRemark {
                            frontmatter {
                                slug
                            }
                        }
                    }
                }
            }
        }
    `).then( result => {
        result.data.allFile.edges.forEach(edge => {
            createPage({
                path: `blog/${edge.node.childMarkdownRemark.frontmatter.slug}`,
                component: blogTemplate,
                context: {
                    slug: edge.node.childMarkdownRemark.frontmatter.slug,
                },
            })
        })
    });

    return Promise.all([ projects, blogs ]);
}