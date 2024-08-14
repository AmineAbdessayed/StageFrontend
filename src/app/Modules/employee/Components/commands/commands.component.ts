import { Component } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.scss']
})
export class CommandsComponent {

  commands:any;
  promotionId!:Number

  constructor( private employeeService: EmployeeService , private router: Router ,     private route: ActivatedRoute
  ){}


ngOnInit(){
  this.getAllCommands();
}


getAllCommands(){

  this.employeeService.ListCommandes().subscribe((data)=> {

    this.commands=data
    console.log(data)
  })
}

 
  


}
