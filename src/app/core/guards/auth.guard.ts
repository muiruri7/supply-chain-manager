import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.getUser();

    if (!user) {
      // Not logged in, redirect to login.
      this.router.navigate(['/login']);
      return false;
    }

    const allowedRoles = next.data['roles'] as Array<string>;
    if (allowedRoles && allowedRoles.includes(user.role)) {
      return true;
    }

    // If role doesn't match, you might redirect to a "not authorized" page.
    this.router.navigate(['/login']);
    return false;
  }
}
