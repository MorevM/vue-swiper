import copy from 'recursive-copy';

await Promise.all([
	copy('./node_modules/swiper/', './dist/', {
		overwrite: true,
		filter: ['**/*.css', '**/*.scss', '**/*.less'],
	}),
	copy('./src', './dist/', {
		overwrite: true,
		filter: ['**/*.css'],
	}),
]);
