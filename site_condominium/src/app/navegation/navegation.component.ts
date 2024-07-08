import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Resident } from '../pages/resident/model/resident';


@Component({
  selector: 'app-navegation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.scss']
})
export class NavegationComponent implements OnInit {
  loggedInUserName: string;
  isLogged: boolean = false;
  residents: Resident[] = [];
  isOpen = false;

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

    if (isPlatformBrowser(this.platformId)) {
      const storedUserName = localStorage.getItem('loggedInUserName');
      this.loggedInUserName = storedUserName ? storedUserName : ' ';
      this.isLogged = !!storedUserName;
    } else {
      this.loggedInUserName = 'Guest';
      this.isLogged = false;
    }
  }

  ngOnInit() {

  }

  



  logout() {
    console.log('clicou para sair');
    localStorage.clear();
    this.reloadPageAndRedirect();
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  reloadPageAndRedirect() {
    const redirectUrl = '/login';
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = redirectUrl;
    }
  }

  checkLocalStorageForItem(key: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const item = localStorage.getItem(key);
      return item !== null;
    }
    return false;
  }

  performActionBasedOnLocalStorageItem() {
    const isItemPresent = this.checkLocalStorageForItem('someKey');
    if (isItemPresent) {
      console.log('Item encontrado no localStorage');
    } else {
      console.log('Item não encontrado no localStorage');
      this.router.navigate(['/login']);
    }
  }
}
