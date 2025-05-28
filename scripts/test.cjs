console.log("Ejecutando pruebas con Mocha...");

const { spawn } = require('child_process');

// Ejecuta el comando `mocha` como proceso hijo
const mocha = spawn('npx', ['mocha'], { stdio: 'inherit' });

mocha.on('exit', (code) => {
  process.exit(code);
});
