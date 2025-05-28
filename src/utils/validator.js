export const isValidMethod = (method) => ['GET', 'POST', 'DELETE'].includes(method);

export const isValidResource = (resource) => resource === 'products';

export const isValidId = (id) => {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0;
};


export const showUsage = () => {
  console.log(`
Uso:
  GET products                 → Lista todos los productos
  GET products <id>           → Muestra un producto por ID
  POST products <t> <p> <c>   → Crea un producto (title, price, category)
  DELETE products <id>        → Elimina un producto por ID
`);
};
