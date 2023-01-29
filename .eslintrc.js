module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	extends: [
		'plugin:react/recommended',
		'standard-with-typescript',
		'eslint-config-prettier',
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
	},
	plugins: [
		'react',
		// '@typescript-eslint',
		// '@typescript-eslint/dot-notation'
	],
	rules: {
		// 'no-console': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/no-floating-promises': 'off', // algo de promesas
		// "@typescript-eslint/no-misused-promises": "error"
	},
};
