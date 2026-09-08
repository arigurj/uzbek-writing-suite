import esbuild from 'esbuild';
import process from 'process';

const banner = `
`;

const prod = process.argv[2] === 'production';

const context = await esbuild.context({
	banner: {
		js: banner,
	},
	entryPoints: ['src/main.ts'],
	bundle: true,
	external: [
		'obsidian',
		'electron',
		'@codemirror/autocomplete',
		'@codemirror/collab',
		'@codemirror/commands',
		'@codemirror/language',
		'@codemirror/lint',
		'@codemirror/search',
		'@codemirror/state',
		'@codemirror/view',
		'@lezer/common',
		'@lezer/highlight',
		'@lezer/lr',
		'os',
		'path',
		'fs',
		'crypto',
		'url',
		'util',
		'events',
		'stream',
		'buffer',
		'assert',
		'module',
		'child_process',
		'tty',
		'net',
		'dns',
		'tls',
		'http',
		'https',
		'zlib',
		'worker_threads',
		'async_hooks',
		'perf_hooks',
		'inspector',
		'vm',
		'cluster',
		'readline',
		'repl',
		'punycode',
		'querystring',
		'string_decoder',
		'timers',
	],
	format: 'cjs',
	target: 'es2021',
	logLevel: 'info',
	sourcemap: prod ? false : 'inline',
	treeShaking: true,
	outfile: 'main.js',
	minify: prod,
});

if (prod) {
	await context.rebuild();
	process.exit(0);
} else {
	await context.watch();
}
