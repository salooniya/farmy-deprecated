const execSync = require('child_process').execSync;

const message = process.argv[2];
const version = process.argv[3];

console.log(message, version);

if (message && version) {
    try {
        console.log(`=> git add .`);
        execSync(`git add .`);
        console.log(`=> git commit -m "${message}"`);
        execSync(`git commit -m "${message}"`);
        console.log(`=> npm version ${version}`);
        execSync(`npm version ${version}`);
        console.log(`=> git push`);
        execSync(`git push`);
        console.log(`=> npm publish`);
        execSync(`npm publish`);
    } catch (err) {
        console.log('error :', err);
    }
} else {
    throw Error('Wrong args passed');
}