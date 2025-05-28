import { expect } from 'chai';
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct
} from '../src/services/productsService.js';

describe('Servicio de Productos', () => {
  describe('getAllProducts', () => {
    it('debería retornar un array de productos', async () => {
      const products = await getAllProducts();
      expect(products).to.be.an('array');
      expect(products.length).to.be.greaterThan(0);
    });
  });

  describe('getProductById', () => {
    it('debería retornar un producto válido para un ID existente', async () => {
      const product = await getProductById(1);
      expect(product).to.be.an('object');
      expect(product).to.have.property('id', 1);
    });

    it('debería lanzar un error para un ID inexistente', async () => {
      try {
        await getProductById(9999);
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('No hay producto con el id: 9999');
      }
    });
  });

  describe('createProduct', () => {
    it('debería crear un nuevo producto y retornar sus datos', async () => {
      const newProduct = {
        title: 'Producto de prueba',
        price: 99.99,
        category: 'electronics'
      };
      const createdProduct = await createProduct(newProduct);
      expect(createdProduct).to.be.an('object');
      expect(createdProduct).to.include.keys('id', 'title', 'price', 'category');
      expect(createdProduct.title).to.equal(newProduct.title);
    });
  });

  describe('deleteProduct', () => {
    it('debería eliminar un producto existente', async () => {
      // Primero, crear un producto para luego eliminarlo
      const newProduct = {
        title: 'Producto a eliminar',
        price: 49.99,
        category: 'books'
      };
      const createdProduct = await createProduct(newProduct);
      const deletedProduct = await deleteProduct(createdProduct.id);
      expect(deletedProduct).to.be.an('object');
      expect(deletedProduct.id).to.equal(createdProduct.id);
    });

  });
});
