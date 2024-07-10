import { Component } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent {

  constructor( private router:Router ,
               private adminService:AdminService
  ){}

  




  GoToListUsers(){
    this.router.navigateByUrl('/admin/getUsers')

  }
  GoToaddUsers(){
    this.router.navigateByUrl('/admin/addUser')
  }

}
