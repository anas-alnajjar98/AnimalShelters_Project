import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalComponent } from './dima/animal/animal.component';
import { AnimalDetailsComponent } from './dima/animal-details/animal-details.component';

const routes: Routes = [
  { path: 'animal/:id', component: AnimalComponent },
  { path: 'animalDetails/:id', component: AnimalDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
