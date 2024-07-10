import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {


  userId!:number;
  userDetail:any;

  constructor(   private router: Router,
                 private route: ActivatedRoute,
                 private adminService: AdminService


  ){}



  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.getUser();
  }


  getUser():void {

    this.adminService.getUserById(this.userId).subscribe((data)=> {
        console.log(data)
        this.userDetail=data
    }, 
      (error)=> {
         console.error('error fetching user details',error)
      }
    
  )}


  DeleteUser(userId: number): void {
    this.adminService.DeleteUser(userId).subscribe(
      (response) => {
        console.log("User deleted successfully");
        this.router.navigateByUrl('/admin/getUsers');
      },
      (error) => {
        console.error("Error deleting the user", error);  
      }, 
    );
  }


  

  
}
