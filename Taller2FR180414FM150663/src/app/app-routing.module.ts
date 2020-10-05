import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrosComponent } from './components/registros/registros.component';
import { ProductsComponent } from './components/products/products.component';


const routes: Routes = [
  {path:'registros',component:RegistrosComponent},
  {path:'productos',component:ProductsComponent},
  {path:'**',component:RegistrosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
