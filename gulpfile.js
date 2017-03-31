const del = require('del');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const merge = require('merge-stream');
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
	return gulp.src([
		`${options.clientSrc}/scripts/main.js`,
		`${options.clientSrc}/scripts/main.config.js`,
		`${options.clientSrc}/scripts/**/!(main|main.config).js`
	])
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format())
		.pipe(plugins.eslint.failAfterError())
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.babel())
		.pipe(plugins.concat('all.min.js'))
		.pipe(plugins.ngAnnotate())
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
		.pipe(plugins.babel())
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest(`${options.dist}/server/`));
});

/*
	Vendors
 */
gulp.task('vendor:scripts', () => {
	return gulp.src([
		`${options.npm}/angular/angular.js`,
		`${options.npm}/angular-animate/angular-animate.js`,
		`${options.npm}/angular-ui-router/release/angular-ui-router.js`,
		`${options.npm}/angular-touch/angular-touch.js`,
		`${options.npm}/bootstrap.native/build.js`,
		`${options.npm}/angular-ui-bootstrap/dist/ui-bootstrap.js`
	])
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('vendor.min.js'))
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest(`${options.dist}/client/scripts/`));
});

gulp.task('vendor:styles', () => {
	return gulp.src([
		`${options.npm}/bootstrap/dist/css/bootstrap.css`,
		`${options.npm}/font-awesome/css/font-awesome.css`
	])
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('vendor.min.css'))
		.pipe(plugins.cleanCss())
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest(`${options.dist}/client/styles/`));
});

gulp.task('vendor:fonts', () => {
	const bootstrap = gulp.src(`${options.npm}/bootstrap/fonts/**/*`,
		{base: `${options.npm}/bootstrap/fonts/`})
		.pipe(gulp.dest(`${options.dist}/client/fonts/`));

	const fontAwesome = gulp.src(`${options.npm}/font-awesome/fonts/**/*`,
		{base: `${options.npm}/font-awesome/fonts/`})
		.pipe(gulp.dest(`${options.dist}/client/fonts/`));

	return merge(bootstrap, fontAwesome);
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
		['styles', 'scripts:client', 'vendor:scripts', 'vendor:styles', 'vendor:fonts', 'html'],
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
