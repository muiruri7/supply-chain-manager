import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'supply-chain-manager';
  showNavbar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        // Use a type guard to filter NavigationEnd events
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        // Define routes where navbar should be hidden.
        const hideNavbarRoutes = ['/login', '/register'];
        this.showNavbar = !hideNavbarRoutes.includes(event.urlAfterRedirects);
      });
  }
}
