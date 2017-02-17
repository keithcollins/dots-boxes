// Node modules
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var nib = require("nib");
var del = require("del");

// Gulp-related
var gulp = require("gulp");
var changed = require("gulp-changed");
var jade = require("gulp-jade");
var preprocess = require("gulp-preprocess");
var shell = require("gulp-shell");
var stylus = require("gulp-stylus");

// Non-gulp NPM modules
var fs = require("fs");
var http = require('http');

// Local modules
var args = require("./gulp/cli").parse();
var config = require("./gulp/config");

var isProd = args.build ? true : false;
var preprocessOpts = {
	context: {
		ENV: isProd ? "prod" : "dev"
	}
};

var allTasks = [
	"jade",
	"stylus",
	"browserify",
	"copy-assets"
];

/**
 * Compile Jade HTML templates.
 */
function compileJadeTask() {
	return gulp.src(config.paths.src.jade + "/index.jade")
		.pipe(jade({ pretty: true, locals: content }))
		.pipe(gulp.dest(config.dirs.build))
		.pipe(reload({ stream: true }));
}

compileJadeTask.description = "Compile Jade HTML templates";
gulp.task("jade", compileJadeTask);

/**
 * Compile Stylus CSS meta-language.
 */
function compileStylusTask() {
	return gulp.src(config.paths.src.styl + "/index.styl")
		.pipe(stylus({
			use: [nib()],
			"include css": true,
			errors: true
		}))
		.pipe(gulp.dest(config.paths.build.css))
		.pipe(reload({ stream: true }));
}

compileStylusTask.description = "Compile Stylus CSS meta-language";
gulp.task("stylus", compileStylusTask);

/**
 * Bundle Javascript with browserify.
 */
function compileJavascriptTask(doneCallback) {
	var bundler = browserify({
		entries: [config.paths.src.js + "/index.js"],
		debug: !isProd
	});

	// if (isProd && !args["dont-minify"]) {
	// 	bundler.transform({ global: true }, "uglifyify");
	// }

	return bundler
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
		.on('error', function(err) {
			console.error('ERROR IN JS');
			console.error(err.message);
			doneCallback();
		})
		.pipe(source("index.js"))
		.pipe(gulp.dest(config.paths.build.js))
		.pipe(reload({ stream: true }));
}

compileJavascriptTask.description = "Bundle Javascript with browserify";
gulp.task("browserify", ["preprocess"], compileJavascriptTask);

/**
 * Clear files from the build directory.
 */
// function cleanTask() {
// 	return del([
// 		config.dirs.build + "/**"
// 	]);
// }
//
// cleanTask.description = "Clear files from the build directory";
// gulp.task("clean", cleanTask);

/**
 * Copy static assets to build path.
 */
function copyAssetsTask() {
	return gulp.src(config.paths.src.assets + "/**")
		.pipe(gulp.dest(config.paths.build.assets))
		.pipe(reload({ stream: true }));
}

copyAssetsTask.description = "Copy static assets to build path";
gulp.task("copy-assets", copyAssetsTask);

/**
 * Writes environment configuration variables to config.js and puts it in
 * the build directory.
 */
function preprocessTask() {
	return gulp.src([config.paths.src.js + "/config.js"])
		.pipe(preprocess(preprocessOpts))
		.pipe(gulp.dest(config.paths.build.js));
}

preprocessTask.description = "Preprocess dev/prod conditional code";
gulp.task("preprocess", preprocessTask);

/**
 * Watches project files for changes and runs the appropriate copy/compile
 * tasks.
 */
function watchTask(done) {
	gulp.watch(config.paths.src.assets + "/**", ["copy-assets"]);
	gulp.watch(config.paths.src.js + "/**", ["browserify"]);
	gulp.watch(config.paths.src.styl + "/**", ["stylus"]);
	gulp.watch(config.paths.src.jade + "/**", ["jade"]);
	done();
}

watchTask.description = "Watch local files for changes and re-build as necessary."
gulp.task("watch", allTasks, watchTask);

/**
 * Starts the browsersync server.
 */
function browserSyncTask() {
	browserSync({
		server: {
			baseDir: '../../dots-boxes'
		},
		open: false
	});
}

browserSyncTask.description = "Serve the built project using BrowserSync";
gulp.task("browser-sync", ["watch"], browserSyncTask);

/**
 * Other tasks
 */
// gulp.task("shell", allTasks, shell.task(shellCmd));
// gulp.task("build", ["shell"]);

if (args.build) {
	gulp.task("default", function () {
		gulp.start("build");
	});
} else {
	gulp.task("default", function () {
		gulp.start("browser-sync");
	});
}
