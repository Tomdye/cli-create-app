import template from './template';
import { join } from 'path';
const pkgDir: any = require('pkg-dir');

export type RenderFilesConfig = [string, string, string, string][]

const packagePath = pkgDir.sync(__dirname);

export default async function (renderFilesConfig: RenderFilesConfig, renderData: any) {
	let renderPromises: Promise<void>[] = [];

	await renderFilesConfig.forEach(([fileName, destBase]) => {
		renderPromises.push(template(join(packagePath, 'templates', fileName), join('.', ...destBase.split('/'), fileName), renderData));
	});

	return Promise.all(renderPromises);
};
