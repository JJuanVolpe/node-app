import express from 'express';
import { serverConfig } from '../../config/serverConfig.js'; // Importa la configuración
import homeRoutes from '../routes/home.js';
import statusRoutes from '../routes/status.js';
import userRoutes from '../routes/users.js';
import productRoutes from '../routes/products.js';

const app = express();
const { staticFolder } = serverConfig;

// Usar la configuración de carpeta estática
app.use(express.static(staticFolder));

// Usar las rutas organizadas
app.use('/', homeRoutes);
app.use('/', statusRoutes);
app.use('/', userRoutes);
app.use('/', productRoutes);

export default app;