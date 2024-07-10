import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  toggle(){
    const element= document.body as HTMLBodyElement
    element.classList.toggle('toggle-sidebar')
  }
}
