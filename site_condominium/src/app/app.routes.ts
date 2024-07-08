import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResidentComponent } from './pages/resident/resident.component';
import { LoginComponent } from './pages/login/login.component';
import { OwnersComponent } from './administrator/owners/owners.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ResidentFormComponent } from './administrator/resident-form/resident-form.component';
import { PaymentComponent } from './administrator/payment/payment.component';
import { OwnerUnitComponent } from './pages/owner-unit/owner-unit.component';

export const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'resident', component: ResidentComponent },
  { path: 'owner', component: OwnersComponent },
  { path: 'owner-unit', component: OwnerUnitComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'resident-form/:id', component: ResidentFormComponent },
  { path: '**', component: NotFoundComponent },
];
