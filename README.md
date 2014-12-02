## IPGPAY Prototype

### Dependencies

* Rubygems listed in Gemfile, install with `bundle install` via bundler (bundler.io)
* Node modules listed in package.json, install with `npm install` via npm

### Build

* This whole thing builds with gulp (gulpjs.com) into a build/ directory by running `gulp` from the root dir
* The default task scrubs the build/ directory, and runs 2 watch tasks for sass+css and jekyll+html
* `gulp --production` is meant to build everything with minified css, uglified js, cleaned up html, but isn’t properly configured