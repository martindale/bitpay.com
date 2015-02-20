## Developing

```sh
$ npm install -g gulp
$ npm install
$ gulp serve
```

### Build

```sh
$ gulp
```

Build and optimize the site, ready for deployment.
This includes linting as well as image, script, stylesheet and HTML optimization and minification.

### Serve Production Build

```sh
$ gulp serve:dist
```

Serve the optimized and minified version of the site for local testing.

### Performance Insights

```sh
$ gulp pagespeed
```

Runs [bitpay.com](https://bitpay.com) against the [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) API to stay on top of where we can improve.

### Deploy to gh-pages

```sh
$ gulp deploy
```

This builds for production, then deploys the dist folder to gh-pages.
