import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/Auth/Services/Storage/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private router:Router ,){}



  logout(): void {
    StorageService.logout(); // Assuming logout is static
    // Optionally, navigate to the login page or another appropriate route after logout
    this.router.navigateByUrl('/login');
  }

}
