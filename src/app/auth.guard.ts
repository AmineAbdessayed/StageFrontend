import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from './Auth/Services/Storage/storage.service';

export const authGuard: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService);
  const router = inject(Router);

  // Check if the user is logged in
  if (storageService.isLoggedIn()) {
    return true; // Allow access
  } else {
    router.navigate(['/login']); // Redirect to login page
    return false; // Deny access
  }
};
