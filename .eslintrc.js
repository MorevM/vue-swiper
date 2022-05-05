module.exports = {
	root: true,
	extends: [
		'@morev/eslint-config/preset/common',
		'@morev/eslint-config/preset/vue2',
	],
	rules: {
		'import/no-named-as-default': 'off', // Swiper used it
		'unicorn/text-encoding-identifier-case': 'off',
		'import/no-unresolved': ['error', {
			commonjs: true,
			caseSensitive: true,
			ignore: [
				'^~/',
				'^~styles',
				'^~components',
			],
		}],
	},
	overrides: [
		{
			files: ['*.vue'],
			rules: {
				'vue/no-bare-strings-in-template': 'off',
			},
		},
	],
};
