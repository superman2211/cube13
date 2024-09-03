import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import replace from '@rollup/plugin-replace';
import base from './rollup.config';

const properties = [
	'transformation',
];

const regex = new RegExp(properties.join('|'));

export default {
	...base,
	plugins: [
		...base.plugins,
		// terser({ }),
		terser({ mangle: { properties: { builtins: true, regex } } }),
		// terser(),
		filesize(),
		replace({
			'const ': 'let ',
			// 'const{': 'let{',
		}),
	],
};
