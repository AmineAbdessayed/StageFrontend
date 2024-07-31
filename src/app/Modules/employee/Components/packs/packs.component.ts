import { Component } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx'; // Import xlsx
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.scss']
})
export class PacksComponent {

  packs: any[] = [];

  constructor(private employeeService:EmployeeService, private router:Router){}

  ngOnInit():void{
   this.getPacks();
  }
  getPacks():void {
    this.employeeService.listPacks()
      .subscribe((data)=> {
              this.packs=data;
      },
       (error)=> {
        console.error("error fetching products: '", error)
       })
  }
  exportToExcel(): void {
    const packsWithoutPictures = this.packs.map(pack => {
      const { displayPicture, ...rest } = pack;
      return rest;
    });
  
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(packsWithoutPictures);
    
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Packs');
    
    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'packs.xlsx');
  }
  
}
