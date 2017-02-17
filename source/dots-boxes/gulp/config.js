var path = require('path');

var dirs = {
	build: '../../dots-boxes',
	tmp: './.tmp',
	src: './src'
};

var paths = {
	src: {
		jade: dirs.src + '/jade',
		js: dirs.src + '/js',
		styl: dirs.src + '/styl',
		assets: dirs.src + '/assets',
	},
	tmp: {
		css: dirs.tmp + '/css',
		jade: dirs.tmp + '/jade',
		js: dirs.tmp + '/js',
		styl: dirs.tmp + '/styl'
	},
	build: {
		css: dirs.build + '/css',
		jade: dirs.build + '/jade',
		js: dirs.build + '/js',
		assets: dirs.build + '/assets',
	}
};

var server = {
	port: '8080',
  root: path.resolve(dirs.build),
};

module.exports = {
	dirs: dirs,
	paths: paths,
	server: server
};
