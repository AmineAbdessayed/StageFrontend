import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';  // Import xlsx

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {
  vouchers: any[] = [];
  filteredVouchers: any[] = [];
  searchForm: FormGroup;
  users: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
    
  }

  ngOnInit(): void {
    this.getAllVouchers();
  }

  getAllVouchers() {
    this.employeeService.listVoucher().subscribe((data) => {
      this.vouchers = data;
      this.filteredVouchers = data; // Initialize with all vouchers
      console.log(data);
    });
  }
  
  exportToExcel() {
    // Create a new array with vouchers excluding the 'id' field and formatting dates
    const vouchersToExport = this.filteredVouchers.map(({ id, user, ...rest }) => {
      return {
        ...rest,
        userName: user?.name || 'N/A',  // Add user name to the exported data
        startDate: this.formatDate(rest.startDate),
        endDate: this.formatDate(rest.endDate),
        creationDate: this.formatDate(rest.creationDate)
      };
    });

    // Convert the vouchers to a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(vouchersToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Vouchers');

    // Export to Excel file
    XLSX.writeFile(wb, 'Vouchers.xlsx');
  }

  private formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
  }


  searchVouchers() {
    const { startDate, endDate } = this.searchForm.value;
    this.filteredVouchers = this.vouchers.filter((voucher: any) => {
      const creationDate = new Date(voucher.creationDate);
      const isAfterStartDate = startDate ? creationDate >= new Date(startDate) : true;
      const isBeforeEndDate = endDate ? creationDate <= new Date(endDate) : true;
      return isAfterStartDate && isBeforeEndDate;
    });
  }
  private matchesDate(voucher: any, date: string): boolean {
    return (voucher.creationDate as string).includes(date);
  }

  DeleteVoucher(voucherId: number) {
    this.employeeService.DeleteVoucher(voucherId).subscribe(() => {
      this.getAllVouchers(); // Refresh the voucher list
      console.log("Deleted");
    });
  }

  sendVoucherToAllClients(voucherId: number) {
    this.employeeService.sendVoucherToAllClients(voucherId).subscribe(response => {
      console.log('Response from backend:', response);
      if (response === "Bon non trouvé ou invalide.") {
        alert("Voucher is invalid.");
      } else {
        alert("Voucher sent to all clients successfully.");
      }
    }, error => {
      console.error('Error:', error);
    });
  }
}
