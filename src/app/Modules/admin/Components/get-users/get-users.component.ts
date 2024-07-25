import { Component } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.scss']
})
export class GetUsersComponent {

  users: any[]=[];

  constructor(private adminService:AdminService ,
              private route:Router
  ){}

  ngOnInit(): void {
    this.getUsers();
  }

getUsers():void {
  this.adminService.getUsers()
    .subscribe((data)=> {
            this.users=data;
            console.log(data)
    },
     (error)=> {
      console.error("error fetching users: '", error)
     })
}

UserDetails(userId:number){
  console.log("hey");
  this.route.navigateByUrl(`/admin/getUser/${userId}`)
}




}
