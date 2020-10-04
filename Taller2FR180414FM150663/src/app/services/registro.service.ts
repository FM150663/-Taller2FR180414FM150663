import { Injectable } from '@angular/core';

// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root'
})

export class RegistroService {
  // Traer los datos de firebase
  registroList: AngularFireList<any>;

  // Una variable temporal, para guardar los datos seleccionados
  registroSeleccionado: Registro = new Registro();

  constructor(private firebase: AngularFireDatabase) { }

  // Traer todos los registros desde firebase 
  obtenerRegistros() { // guarda los elementos en la varible 'registro'
    return this.registroList = this.firebase.list('registros');
  }

  // crear un nuevo registro
  insertarRegistros(registro: Registro) {
    // agregar un dato al final de la lista, como recibe un objeto del tipo Product , puede acceder a sus propiedades
    this.registroList.push({
      nombre: registro.nombre,
      dui: registro.dui,
      codProducto: registro.codProducto,
      descProducto: registro.descProducto,
      precioProducto: registro.precioProducto,
      descuento: registro.descuento
    });
  }

  // Actualiza un producto
  actualizarRegistros(registro: Registro) {
    // Utilizando el metodo update de firebase , se envia clave y los parametros que va actualizar 
    this.registroList.update(registro.$key, {
      nombre: registro.nombre,
      dui: registro.dui,
      codProducto: registro.codProducto,
      descProducto: registro.descProducto,
      precioProducto: registro.precioProducto,
      descuento: registro.descuento
    });
  }

  // Elimina un producto, recibiendo como parametro la clave , utilizando el metodo remove de firebase
  eliminarRegistros($key: string) {
    this.registroList.remove($key);
  }

}
