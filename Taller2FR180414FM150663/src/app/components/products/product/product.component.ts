import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//  Service 
import { ProductService } from '../../../services/product.service';
// Class
import { Product } from '../../../models/product';
// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  constructor(
    public productoService: ProductService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    //lista de productos
    this.productoService.obtenerProductos();
    this.resetForm();
  }

  onSubmit(productForm: NgForm) {
    if (productForm.value.$key == null)
      this.productoService.insertarProductos(productForm.value);
    else
      this.productoService.actualizarProductos(productForm.value);

    this.resetForm(productForm);
    this.toastr.success('Operación exitosa', 'Producto Registrado');
  }

  // Para limpiar el formulario
  resetForm(productForm?: NgForm) {    
    if (productForm != null)
    productForm.reset();
    this.productoService.productoSeleccionado = new Product();
  }
}
