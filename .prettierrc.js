module.exports = {
	printWidth: 100,
	semi: true,
	tabWidth: 4,
	useTabs: true,
	singleQuote: true,
	quoteProps: 'consistent',
	trailingComma: 'all',
	arrowParens: 'always',
	bracketSameLine: false,
	htmlWhitespaceSensitivity: 'strict',
	vueIndentScriptAndStyle: false,
	overrides: [
		{
			files: ['./scripts/*.js'],
			options: {
				singleQuote: false,
			},
		},
	],
};