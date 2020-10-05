import { Component, OnInit } from '@angular/core';

// model
import { Product } from '../../../models/product';

// service
import { ProductService } from '../../../services/product.service';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // Arreglo para almacenar la informacion que se obtenga de la base de datos de firebase
  productoList: Product[];

  constructor(
    private productoService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    return this.productoService.obtenerProductos()
      .snapshotChanges().subscribe(item => {
        this.productoList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.productoList.push(x as Product);
        });
      }); 
  }

  onEdit(producto: Product) {
    this.productoService.productoSeleccionado = Object.assign({}, producto);
  }

  onDelete($key: string) {
    if (confirm('De verdad quieres eliminar este producto?')) {
      this.productoService.eliminarProductos($key);
      this.toastr.warning('Eliminación realizada con exito', 'Producto eliminado');
    }
  }
}
