import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavegationComponent } from './navegation/navegation.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavegationComponent, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'site_condominium';

}
