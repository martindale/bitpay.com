[![Build Status](https://travis-ci.org/bitpay/website.svg)](https://travis-ci.org/bitpay/website) [![devDependency Status](https://david-dm.org/bitpay/website/dev-status.svg)](https://david-dm.org/bitpay/website#info=devDependencies) [![Stories in Ready](https://badge.waffle.io/bitpay/website.png?label=ready&title=Ready)](https://waffle.io/bitpay/website)

Developing
----------

```sh
$ npm install -g gulp
$ npm install
$ gulp serve
```

### Build

```sh
$ gulp
```

Build and optimize the site, ready for deployment. This includes linting as well as image, script, stylesheet and HTML optimization and minification.

### Serve Production Build

```sh
$ gulp serve:dist
```

Serve the optimized and minified version of the site for local testing.

### Deploy to gh-pages

```sh
$ gulp deploy
```

This builds for production, then deploys the dist folder to gh-pages.
