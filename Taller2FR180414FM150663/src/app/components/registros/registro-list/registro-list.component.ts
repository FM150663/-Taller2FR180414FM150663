import { Component, OnInit } from '@angular/core';

// model
import { Registro } from '../../../models/registro';

// service
import { RegistroService } from '../../../services/registro.service';

// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-list',
  templateUrl: './registro-list.component.html',
  styleUrls: ['./registro-list.component.css']
})

export class RegistroListComponent implements OnInit {

  // Arreglo para almacenar la informacion que se obtenga de la base de datos de firebase
  registroList: Registro[];

  constructor(
    private registroService: RegistroService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    return this.registroService.obtenerRegistros()
      .snapshotChanges().subscribe(item => {
        this.registroList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.registroList.push(x as Registro);
        });
      }); 
  }

  onEdit(registro: Registro) {
    this.registroService.registroSeleccionado = Object.assign({}, registro);
  }

  onDelete($key: string) {
    if (confirm('De verdad quieres eliminar este registro?')) {
      this.registroService.eliminarRegistros($key);
      this.toastr.warning('Eliminación realizada con exito', 'Registro eliminado');
    }
  }
}
