import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.getUser();
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }
    
    // Allow access to the generic dashboard regardless of role.
    if (state.url.startsWith('/dashboard')) {
      return true;
    }
    
    // For routes with role restrictions, check if user's role is allowed.
    const allowedRoles = route.data?.['roles'] as string[] | undefined;
    if (allowedRoles) {
      if (user.role && allowedRoles.includes(user.role)) {
        return true;
      } else {
        // Redirect to dashboard if role does not match.
        this.router.navigate(['/dashboard']);
        return false;
      }
    }
    
    return true;
  }
}
