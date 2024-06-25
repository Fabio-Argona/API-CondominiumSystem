import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Resident } from '../pages/resident/model/resident';

@Component({
  selector: 'app-navegation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.scss']
})
export class NavegationComponent {

  residents: Resident[] = [
   
  ];

  isOpen = false;

  constructor(private eRef: ElementRef, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.eRef.nativeElement.contains(e.target)) {
        this.isOpen = false;
      }
    });
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }
}
