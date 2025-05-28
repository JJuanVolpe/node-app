import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct
} from '../services/productsService.js';

import {
  isValidMethod,
  isValidResource,
  isValidId,
  showUsage
} from '../utils/validator.js';

const [, , methodInput, resourceInput, ...args] = process.argv;

const handleGet = async (resource, idFromPath, args) => {
  const idArg = idFromPath || args[0];

  // 👇 Validar si se pasó algún ID
  if (idArg !== undefined) {
    if (!isValidId(idArg)) {
      console.error(`ID de producto no válido (debe ser un número entero positivo): ${idArg}`);
      showUsage();
      return;
    }

    try {
      const product = await getProductById(Number(idArg));
      console.log(product);
    } catch (error) {
      console.error(error.message);
    }
  } else {
    // No hay ID → devolver todos los productos
    const products = await getAllProducts();
    console.log(products);
  }
};

const handlePost = async (args) => {
  const [title, price, category] = args;

  if (!title || isNaN(parseFloat(price)) || !category) {
    console.error('Parámetros inválidos para crear un producto.');
    showUsage();
    return;
  }

  const newProduct = await createProduct({ title, price: parseFloat(price), category });
  console.log('Producto creado:', newProduct);
};

const handleDelete = async (idFromPath, args) => {
  const idArg = idFromPath || args[0];

  if (!isValidId(idArg)) {
    console.error(`ID de producto no válido (debe ser un número entero positivo): ${idArg}`);
    showUsage();
    return;
  }

  try {
    const deletedProduct = await deleteProduct(Number(idArg));
    console.log('Producto eliminado:', deletedProduct);
  } catch (error) {
    console.error(error.message);
  }
};

const run = async () => {
  try {
    const method = methodInput?.toUpperCase();
    if (!isValidMethod(method)) {
      console.error(`Método no soportado: ${method}`);
      showUsage();
      return;
    }

    const [resource, id] = resourceInput?.split('/') || [];

    if (!isValidResource(resource)) {
      console.error(`Recurso no válido: ${resource}`);
      showUsage();
      return;
    }

    switch (method) {
      case 'GET':
        await handleGet(resource, id, args);
        break;
      case 'POST':
        await handlePost(args);
        break;
      case 'DELETE':
        await handleDelete(id, args);
        break;
      default:
        console.error(`Método no soportado: ${method}`);
        showUsage();
    }
  } catch (err) {
    console.error('Error ejecutando comando:', err.message);
  }
};

run();