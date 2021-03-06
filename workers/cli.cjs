#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');

const logYellow = (log) => console.log('\x1b[33m%s\x1b[89m', log);
const logBlue = (log) => console.log('\x1b[36m%s\x1b[89m', log);
const logRed = (log) => console.log('\x1b[31m%s\x1b[89m', log);

const readFile = function (resolvePath) {
    return fs.readFileSync(path.resolve(__dirname, resolvePath), 'utf8');
};

const pkg = JSON.parse(readFile('../package.json'));

try {

    // setup start
    logBlue('==== SETTING THINGS UP ===');
    logBlue('=> this may take some time');

    // get project name and root path
    const projectName = process.argv[2] || 'farmy';
    const rootPath = process.env.PWD + '/' + projectName;

    // make project root folder
    fs.mkdirSync(rootPath);
    logYellow('* project root folder created');

    // config/
    fs.mkdirSync(rootPath + '/config', { recursive: true });
    logYellow('* config/ created');

    // config/webpack.prod.js
    fs.writeFileSync(rootPath + '/config/webpack.prod.js', readFile('./webpack.prod.js'));
    logYellow('* config/webpack.prod.js created');

    // config/webpack.dev.js
    fs.writeFileSync(rootPath + '/config/webpack.dev.js', readFile('./webpack.dev.js')
    .replaceAll('${pkgName}', pkg.name)
    );
    logYellow('* config/webpack.dev.js created');

    // public/
    fs.mkdirSync(rootPath + '/public', { recursive: true });
    logYellow('* public/ created');

    // public/index.html
    fs.writeFileSync(rootPath + '/public/index.html', readFile('./index.html')
    .replaceAll('${projectName}', projectName)
    );
    logYellow('* public/index.html created');

    // src/
    fs.mkdirSync(rootPath + '/src', { recursive: true });
    logYellow('* src/ created');

    // src/app.fy
    fs.writeFileSync(rootPath + '/src/app.fy', readFile('./app.fy')
    .replaceAll('${pkgName}', pkg.name)
    );
    logYellow('* src/app.fy created');

    // package.json
    fs.writeFileSync(rootPath + '/package.json', readFile('./pkg.json')
    .replaceAll('${projectName}', projectName)
    .replaceAll('${pkgName}', pkg.name)
    .replaceAll('${version}', pkg.version)
    );
    logYellow('* package.json created');


    // install dependencies
    execSync(`cd ${projectName} && npm install`);
    logBlue('* cd project-name && npm install completed');

    // setup completed
    logBlue('==== SETUP COMPLETED ===');
    logBlue('=> cd into project folder');
    logBlue('=> npm start');

} catch (err) {
    logRed('=== SETUP FAILED ===');
    logRed('=> ' + err);
}

