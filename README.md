Wikitree
===========
A web-based research tool, a visual mapping companion for your Wikipedia wanderings

[![Wikitree screenshot](http://i.imgur.com/16H2cSY.png)](https://wikitree.website/)

## Installation

Prereq: ensure you have `node`, `gulp`, and `bower` installed

Fork & clone both the main repo and the env repo (these are designed to live as sibling directories)
- Main repo: https://github.com/wikitree-website/wikitree
- Env repo: https://github.com/wikitree-website/wikitree-env

In the main repo, run:
```
$ npm install
```
(which should also trigger `bower install`)

## Running

To just get things going, run:
```
$ npm start
```
(which should also trigger `gulp build`)

**Or, if you want things to update as you code, run two processes...**

For node restart on server code change:
```
$ nodemon server/server.js
```

For gulp build & rebuild on client code change
```
$ gulp watch
```

## Testing

For testing, run:
```
$ npm test
```



