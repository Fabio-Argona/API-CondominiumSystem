import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Resident } from '../pages/resident/model/resident';

@Component({
  selector: 'app-navegation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.scss']
})
export class NavegationComponent {

  loggedInUserName: string

  residents: Resident[] = [];

  isOpen = false;
  location: any;

  constructor(
    private router: Router,
    private eRef: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.eRef.nativeElement.contains(e.target)) {
        this.isOpen = false;
      }
    });

    // Verifica se está no ambiente do navegador antes de acessar localStorage
    if (isPlatformBrowser(this.platformId)) {
      const storedUserName = localStorage.getItem('loggedInUserName');
      this.loggedInUserName = storedUserName ? storedUserName : ' ';
    } else {
      // Define um valor padrão caso não esteja no navegador (pode ser útil para SSR)
      this.loggedInUserName = 'Guest';
    }

  }

  logout() {
    console.log("clicou para sair");

    // Limpar o localStorage
    localStorage.clear();
    this.router.navigate(['/login']);
    // window.location.reload()

  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

}
