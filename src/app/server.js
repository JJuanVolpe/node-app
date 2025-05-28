  import app from './app.js';
import { serverConfig } from '../../config/serverConfig.js'; // Importa la configuración

const { port } = serverConfig;

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default server;
