import path from 'path';

export default {
	srcDir: './playground/',
	dir: {
		assets: 'assets',
		layouts: 'views/layouts',
		components: 'views/components',
		pages: 'views/pages',
	},
	alias: {
		'~styles': path.resolve(__dirname, './playground/assets/styles'),
		'~components': path.resolve(__dirname, './playground/views/components'),
	},
	head: {
		htmlAttrs: {
			lang: 'en-US',
			dir: 'ltr',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0' },
		],
		title: 'Vue 2 Swiper Playground',
	},
	css: [
		'~/assets/styles/main.scss',
	],
	build: {
		transpile: [
			'@morev/utils',
			'ohash',
			({ isLegacy }) => (isLegacy ? 'ssr-window' : undefined),
			({ isLegacy }) => (isLegacy ? 'swiper' : undefined),
			({ isLegacy }) => (isLegacy ? 'dom7' : undefined),
		],
		babel: {
			plugins: ['@babel/plugin-transform-logical-assignment-operators'],
		},
		postcss: {
			postcssOptions: {
				plugins: {
					'postcss-discard-duplicates': {},
					'postcss-discard-comments': {},
				},
			},
			preset: {
				stage: 1,
			},
		},
	},
};
