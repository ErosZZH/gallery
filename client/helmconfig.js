/*
 * Based on the template in Web Starter Kit : https://github.com/google/web-starter-kit/blob/master/app/index.html
 * To add to the config, add an object:
 * {
 *  type: 'link' | 'meta',
 *  sizes: 'widthxheight',
 *  rel: 'rel value'
 *  filename: <Name of your file'
 * }
 */

// Import all your needed files first (webpack will grab the url)
import favicon from './favicon.ico';

const config = {
  link: [
    { rel: 'icon', href: favicon },
    { rel: 'stylesheet', href: '/assets/styles/main.css', type: 'text/css' }
  ],
  meta: [
    { charset: 'utf-8' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
    { name: 'description', content: 'An isomorphic React demo with gallery' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    { name: 'apple-mobile-web-app-title', content: 'React Webpack Node' },
    { name: 'msapplication-TileColor', content: '#3372DF' }
  ]
};

export default config;
