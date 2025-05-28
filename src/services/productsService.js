
// src/services/productsService.js
const baseURL = 'https://fakestoreapi.com/products';

export const getAllProducts = async () => {
  const res = await fetch(baseURL);
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${baseURL}/${id}`);

  if (!res.ok) {
    throw new Error(`No hay producto con el id: ${id}`);
  }

  // Validar que la respuesta tiene contenido
  const text = await res.text();
  if (!text) {
    throw new Error(`No hay producto con el id: ${id}`);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`No hay producto con el id: ${id}`);
  }

  if (!data || Object.keys(data).length === 0) {
    throw new Error(`No hay producto con el id: ${id}`);
  }

  return data;
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${baseURL}/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    throw new Error(`No hay producto con el id: ${id}`);
  }

  const text = await res.text();
  if (!text) {
    throw new Error(`No hay producto con el id: ${id}`);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`No hay producto con el id: ${id}`);
  }

  if (!data || Object.keys(data).length === 0) {
    throw new Error(`No hay producto con el id: ${id}`);
  }

  return data;
};


export const createProduct = async ({ title, price, category }) => {
  const product = {
    title,
    price: parseFloat(price),
    category
  };

  const res = await fetch(baseURL, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: { 'Content-Type': 'application/json' }
  });
  return res.json();
};
