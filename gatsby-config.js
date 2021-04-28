require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

let facebook_pixel = ''
let gtm = '1234'

module.exports = {
  siteMetadata: {
    title: `Skibbutz`,
    description: `Welcome to the Skibbutz! Our lovely home away from home for the 2021 Ski Season! 🎿`,
    author: `Joe Sangiorgio`,
    siteUrl: `https://skibbutz.com/`,
    phone: '1800123456',
    fax: '180012345',
    address: 'Keystone, CO',
    email: 'contact@skibbutz.com'

  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: gtm,
        includeInDevelopment: false
      }
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: facebook_pixel,
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: './src/assets/images/logo.png'
      },
    },
    {
      resolve: "gatsby-theme-auth0",
      options: {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        redirectUri: process.env.AUTH0_CALLBACK_URL,
        // audience: process.env.AUTH0_AUDIENCE, // Optional
        // responseType: 'token id_token'
        // scope: 'openid profile email', // Optional
        // callbackPath: "/auth/callback", // Optional
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-netlify`,
    `gatsby-plugin-styled-components`
  ],
}
