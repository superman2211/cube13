import html from '@rollup/plugin-html';

function template() {
	return `
<!doctype html>
<html lang="en">
	<head>
		<link rel="manifest" href="manifest.json"/>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
		<title>Cube 13</title>
	</head>
	<body style="margin:0;overflow:hidden;background-color:black;">
		<canvas id="c" style="width:100%;height:100%;background-color:black;"></canvas>
		<script src="s.js"></script>
	</body>
</html>
`.replace(/[\n\t]/g, '');
}

export default {
	input: 'dist/esm/index.js',
	output: {
		file: 'dist/build/s.js',
		format: 'iife',
	},
	plugins: [
		html({ template }),
	],
};
