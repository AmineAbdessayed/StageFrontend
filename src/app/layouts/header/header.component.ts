import { Component } from '@angular/core';
import { StorageService } from 'src/app/Auth/Services/Storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName: string = '';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.getUser();
  }


  toggle(){
    const element= document.body as HTMLBodyElement
    element.classList.toggle('toggle-sidebar')
  }

  getUser() {
    this.userName = StorageService.getUserName();
    console.log("------------------------------", this.userName);
  }
}
