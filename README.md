![express-marko-logo](https://raw.githubusercontent.com/SandeepVattapparambil/express-marko-generator/master/app-logo.png)
# Express Marko Generator v2.1.1

![npm version](https://badge.fury.io/js/express-marko-generator.svg) ![Dependencies](https://david-dm.org/SandeepVattapparambil/express-marko-generator.svg) ![GitHub license](https://img.shields.io/github/license/SandeepVattapparambil/express-marko-generator.svg) ![PyPI - Status](https://img.shields.io/pypi/status/Django.svg) ![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg) [![Greenkeeper badge](https://badges.greenkeeper.io/SandeepVattapparambil/express-marko-generator.svg)](https://greenkeeper.io/) [![Known Vulnerabilities](https://snyk.io/test/github/SandeepVattapparambil/express-marko-generator/badge.svg?targetFile=package.json)](https://snyk.io/test/github/SandeepVattapparambil/express-marko-generator?targetFile=package.json) ![Build Status](https://travis-ci.org/SandeepVattapparambil/express-marko-generator.svg?branch=master) ![GitHub issues](https://img.shields.io/github/issues/SandeepVattapparambil/express-marko-generator.svg) ![GitHub forks](https://img.shields.io/github/forks/SandeepVattapparambil/express-marko-generator.svg) ![GitHub stars](https://img.shields.io/github/stars/SandeepVattapparambil/express-marko-generator.svg) ![Twitter](https://img.shields.io/twitter/url/https/github.com/SandeepVattapparambil/express-marko-generator.svg?style=social)


A generic CLI tool to generate an ExpressJS application with MarkoJS and MaterializeCSS framework integration. This tool can bootstrap a complete production ready project code base with all the basic & essential project settings.

> **Note:**  This tool is yet to be tested on UNIX/Linux & Mac. Works fine on Windows. Please open issues if you encounter one.

### Dependency
This tool is built with the following npm modules.
##### Async
 Async is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript. Although originally designed for use with Node.js and installable via npm install --save async, it can also be used directly in the browser.
[https://www.npmjs.com/package/async](https://www.npmjs.com/package/async)

##### Chalk
 An npm module for terminal styling.
[https://www.npmjs.com/package/chalk](https://www.npmjs.com/package/chalk)

##### Clui
This is a Node.js toolkit for quickly building nice looking command line interfaces which can respond to changing terminal sizes.
[https://www.npmjs.com/package/clui](https://www.npmjs.com/package/clui)

##### Figlet
This tool is used to draw and render ASCII graphics onto the terminal.    This project aims to fully implement the FIGfont spec in JavaScript. It works in the browser and with Node.js. You can see it in action here: http://patorjk.com/software/taag/ (the figlet.js file was written to power that application).
[https://www.npmjs.com/package/figlet](https://www.npmjs.com/package/figlet)

##### Replace-in-files
A simple utility to quickly replace text in one or more files or globs. Works synchronously or asynchronously with either promises or callbacks. Make a single replacement or multiple replacements at once.
[https://www.npmjs.com/package/replace-in-file](https://www.npmjs.com/package/replace-in-file)

## Changelog
##### v2.1.1
- Updated Documentation

##### v2.1.0
- Re-written using a custom Promise wrapper for arbitrary shell command executions.
- Improved speed & performance
- Code refactorings
- Code optimization

##### v2.0.1
- Continuous Integration (CI) added using Travis-CI.

##### v2.0.0
- Completely re-written using async to improve speed and performance.
- Code refactorings
- Code optimization

##### v1.0.x
- Initial release prototype.

## Installation
### NPM
This package prefers a global installation
```sh
npm i express-marko-generator -g
```

### Usage
```sh
express-marko-generator  <project-name>
```
You will see the following logs in your terminal if successful.
```sh
Project files downloaded successfully.
Project customizations completed succesfully.
Project -> <project-name> created succesfully.
```
and then cd into ```<project-name>```

then install dependecies by
```sh
npm i
```

then you can run your project by
```sh
npm start
```
and go to ```http://localhost:3000```

### Project structure
The generated project would have the following structure:
```
<project-name>
├───bin
├───components
│   ├───app-card
│   ├───app-header
│   └───app-main
├───config
├───middlewares
├───public
│   ├───css
│   ├───img
│   └───js
├───routes
├──views
│   ├───error
│   └───home
│.babelrc
│app.js
│package.json
```

## License
MIT License

Copyright (c) 2018 Sandeep Vattapparambil

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

> **Note:**  This tool uses the git project [express-marko](https://github.com/SandeepVattapparambil/express-marko) as the base template, you may also check it out. This is not an official eBay project.

### Acknowledgements
Thanks to eBay and the following people for making a wonderful UI framework:
* [Patrick Steele-Idem](https://github.com/patrick-steele-idem) (Twitter: [@psteeleidem](http://twitter.com/psteeleidem))
* [Michael Rawlings](https://github.com/mlrawlings) (Twitter: [@mlrawlings](https://twitter.com/mlrawlings))
* [Phillip Gates-Idem](https://github.com/philidem/) (Twitter: [@philidem](https://twitter.com/philidem))
* [Austin Kelleher](https://github.com/austinkelleher) (Twitter: [@AustinKelleher](https://twitter.com/AustinKelleher))
* [Dylan Piercey](https://github.com/dylanpiercey) (Twitter: [@dylan_piercey](https://twitter.com/dylan_piercey))
* [Martin Aberer](https://github.com/tindli) (Twitter: [@metaCoffee](https://twitter.com/metaCoffee))

also thanks to ExpressJS and MaterializeCSS for their contributions to OpenSource.

Made with :heart: by [Sandeep Vattapparambil](https://github.com/SandeepVattapparambil).