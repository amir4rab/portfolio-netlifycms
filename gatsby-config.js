module.exports = {
  siteMetadata: {
    siteUrl: "https://www.amir4rab.com",
    title: "portfolio",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve(`./src/layout/layout.jsx`),
      },
    },
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: `${__dirname}/src/images/icon.svg`,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "projects",
        path: `${__dirname}/src/markdown/projects/`,
      },
      __key: "projects",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blogs",
        path: `${__dirname}/src/markdown/blogs/`,
      },
      __key: "blogs",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "terminalContents",
        path: `${__dirname}/src/markdown/terminalContents/`,
      },
      __key: "terminalContents",
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        footnotes: true,
        gfm: true,
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            },
          },
        ],
      },
    },
  ],
};
