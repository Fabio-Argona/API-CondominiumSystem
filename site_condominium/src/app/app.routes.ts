import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResidentComponent } from './pages/resident/resident.component';
import { LoginComponent } from './pages/login/login.component';
import { OwnersComponent } from './administrator/owners/owners.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ResidentDataComponent } from './administrator/resident-data/resident-data.component';
import { ResidentFormComponent } from './administrator/resident-form/resident-form.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'resident', component: ResidentComponent },
  { path: 'owner', component: OwnersComponent },
  { path: 'resident-form/:id', component: ResidentFormComponent },
  { path: 'resident_data', component: ResidentDataComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },

];
