import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//  Service 
import { RegistroService } from '../../../services/registro.service';
import { ProductService } from '../../../services/product.service';
// Modelo
import { Registro } from '../../../models/registro';
import { Product } from '../../../models/product';
// toastr
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  producto1:any;
  producto2:any;
  producto3:any;
  producto4:any;
  producto5:any;
  //listadoProductos=[];
  listadoProductos: Product[];
  opcionSeleccionado:string;
  reg :Registro = new Registro();
  registroList: Registro[];
  
  constructor(
    private productoService: ProductService,
    public registroService: RegistroService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    //lista de productos
    /*this.producto1={"id":0,"codigo":"PROD001","descripcion":"Cereal","precio":2.30};
    this.producto2={"id":1,"codigo":"PROD002","descripcion":"Leche","precio":1.20};
    this.producto3={"id":2,"codigo":"PROD003","descripcion":"Huevos","precio":1.00};
    this.producto4={"id":3,"codigo":"PROD004","descripcion":"Carne Congelada","precio":2.00};
    this.producto5={"id":4,"codigo":"PROD005","descripcion":"Arroz","precio":0.50};
    this.listadoProductos.push(this.producto1);
    this.listadoProductos.push(this.producto2);
    this.listadoProductos.push(this.producto3);
    this.listadoProductos.push(this.producto4);
    this.listadoProductos.push(this.producto5);*/
    this.obtenerProductos();
    this.opcionSeleccionado="Selecciona";
    //inicializando
    this.registroService.obtenerRegistros();
    this.resetForm();
  }

  private obtenerProductos(){
    this.productoService.obtenerProductos()
      .snapshotChanges().subscribe(item => {
        this.listadoProductos = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.listadoProductos.push(x as Product);
        });
      });
  }

  onSubmit(registroForm: NgForm) {
    this.reg.$key = registroForm.value.$key;
    this.reg.nombre = registroForm.value.nombre;
    this.reg.dui = registroForm.value.dui;
    this.reg.codProducto = this.listadoProductos[registroForm.value.opcionSeleccionado].codigo;
    this.reg.descProducto = this.listadoProductos[registroForm.value.opcionSeleccionado].descripcion;
    this.reg.precioProducto = this.listadoProductos[registroForm.value.opcionSeleccionado].precio;            
    this.reg.descuento = this.validarDescuento(this.reg.dui);
    
    if (registroForm.value.$key == null)
      this.registroService.insertarRegistros(this.reg);
    else
      this.registroService.actualizarRegistros(this.reg);

    this.resetForm(registroForm);
    this.toastr.success('Operación exitosa', 'Venta Registrada');
  }

  private validarDescuento(duiPrueba:string):number{
    var descuento:number;
    descuento = 0;
    this.registroService.obtenerRegistros()
      .snapshotChanges().subscribe(item => {
        this.registroList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.registroList.push(x as Registro);
        });
      }); 

    var visitas:number;
    visitas=1;
    for (var val of this.registroList) {
      if(val.dui==duiPrueba){
        visitas++;
      }      
    }

    if(visitas>1 && visitas < 5){
      descuento=5;
    }else if(visitas>=5){
      descuento=8;
    }
    
    return descuento;
  }

  // Para limpiar el formulario
  resetForm(registroForm?: NgForm) {    
    if (registroForm != null)
      registroForm.reset();
    this.registroService.registroSeleccionado = new Registro();
  }

}
