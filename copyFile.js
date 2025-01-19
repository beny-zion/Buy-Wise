import fs from 'fs';
const sourcePath = './dist/index.html'; // Path to the source file within the 'dist' folder
const desƟnaƟonPath = './dist/404.html'; // Path to the desƟnaƟon file within the 'dist' folder

fs.copyFile(sourcePath, desƟnaƟonPath, (err) => {
if (err) {
console.error('Error copying file:', err);

} else {
console.log('File copied successfully!');
}
});