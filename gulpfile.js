const del = require('del');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const runSequence = require('run-sequence');

const plugins = gulpLoadPlugins();

const options = {
	dist: 'dist',
	npm: 'node_modules',
	src: 'src',
	clientSrc: 'src/client',
	serverSrc: 'src/server'
};

gulp.task('styles', () => {
	return gulp.src(`${options.clientSrc}/styles/**/*.css`,
		{base: options.clientSrc})
		.pipe(gulp.dest(`${options.dist}/client/`));
});

gulp.task('html', () => {
	return gulp.src(`${options.clientSrc}/**/*.html`,
		{base: options.clientSrc})
		.pipe(gulp.dest(`${options.dist}/client/`));
});

/*
	Scripts
 */
gulp.task('scripts', () => {
	return runSequence(
		['scripts:client', 'scripts:server']
	);
});

gulp.task('scripts:client', () => {
	return gulp.src([`${options.clientSrc}/scripts/main.js`, `${options.clientSrc}/scripts/**/!{main}.js`])
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format())
		.pipe(plugins.eslint.failAfterError())
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.babel({

		}))
		.pipe(plugins.concat('all.min.js'))
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest(`${options.dist}/client/scripts`));
});

gulp.task('scripts:server', () => {
	return gulp.src(`${options.serverSrc}/**/*.js`,
		{base: options.serverSrc})
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format())
		.pipe(plugins.eslint.failAfterError())
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.babel({

		}))
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest(`${options.dist}/server/`));
});

/*
	Vendors
 */
gulp.task('vendor:scripts', () => {
	return gulp.src([
		`${options.npm}/angular/angular.js`,
		`${options.npm}/angular-route/angular-route.js`
	])
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('vendor.min.js'))
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest(`${options.dist}/client/scripts/`));
});

/*
	Cleaning
 */
gulp.task('clean', () => {
	return del([options.dist]);
});

gulp.task('clean:client', () => {
	return del([`${options.dist}/client`]);
});

gulp.task('clean:server', () => {
	return del([`${options.dist}/server`]);
});

/*
	Building
 */
gulp.task('build', callback => {
	return runSequence(
		'clean',
		['build:client', 'build:server'],
		callback
	);
});

gulp.task('build:client', callback => {
	return runSequence(
		'clean:client',
		['styles', 'scripts:client', 'vendor:scripts', 'html'],
		// 'html',
		callback
	);
});

gulp.task('build:server', callback => {
	return runSequence(
		'clean:server',
		['scripts:server'],
		callback
	);
});
