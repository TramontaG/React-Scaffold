import { defineConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		commonjs({
			include: 'node_modules/**',
		}),
	],
	resolve: {
		alias: {
			src: '/src',
		},
	},
	build: {
		outDir: './dist',
	},
});
