import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Traer los datos de firebase
  productoList: AngularFireList<any>;

  // Una variable temporal, para guardar los datos seleccionados
  productoSeleccionado: Product = new Product();

  constructor(private firebase: AngularFireDatabase) { }

  // Traer todos los registros desde firebase 
  obtenerProductos() { // guarda los elementos en la varible 'registro'
    return this.productoList = this.firebase.list('products');
  }

  // crear un nuevo registro
  insertarProductos(producto: Product) {
    // agregar un dato al final de la lista, como recibe un objeto del tipo Product , puede acceder a sus propiedades
    this.productoList.push({
      id: producto.id,
      codigo: producto.codigo,
      descripcion: producto.descripcion,
      precio: producto.precio
    });
  }

  // Actualiza un producto
  actualizarProductos(producto: Product) {
    // Utilizando el metodo update de firebase , se envia clave y los parametros que va actualizar 
    this.productoList.update(producto.$key, {
      id: producto.id,
      codigo: producto.codigo,
      descripcion: producto.descripcion,
      precio: producto.precio
    });
  }

  // Elimina un producto, recibiendo como parametro la clave , utilizando el metodo remove de firebase
  eliminarProductos($key: string) {
    this.productoList.remove($key);
  }
}
