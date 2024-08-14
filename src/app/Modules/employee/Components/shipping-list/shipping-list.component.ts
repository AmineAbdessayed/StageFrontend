import { Component } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-shipping-list',
  templateUrl: './shipping-list.component.html',
  styleUrls: ['./shipping-list.component.scss']
})
export class ShippingListComponent {

  
  shipingList:any;

  constructor( private employeeService: EmployeeService , private router: Router ,     private route: ActivatedRoute
  ){}


ngOnInit(){
  this.ListShipping();
}


ListShipping(){

  this.employeeService.ListShipping().subscribe((data)=> {

    this.shipingList=data
    console.log(data)
  })
}


printLabel(shipping: any): void {
  const doc = new jsPDF('p', 'mm', 'a4'); // p = portrait, mm = millimeters, a4 = page size

  // Add a logo or branding at the top (replace with your own image)
  const logoUrl = '/assets/aramex.png'; // Base64 image data
  doc.addImage(logoUrl, 'PNG', 10, 10, 50, 20); // (image, format, x, y, width, height)

  // Title
  doc.setFontSize(22);
  doc.setFont('Helvetica', 'bold');
  doc.text('Shipping Label', 105, 40, { align: 'center' });

  // Section 1: Shipping Details
  doc.setFontSize(14);
  doc.setFont('Helvetica', 'normal');
  doc.text('Shipping Details', 10, 60);
  doc.setLineWidth(0.5);
  doc.line(10, 62, 200, 62); // Horizontal line

  doc.setFontSize(12);
  doc.text(`Tracking Number:`, 10, 70);
  doc.text(shipping.trackingNumber, 50, 70);

  doc.text(`Shipping Company:`, 10, 80);
  doc.text(shipping.shippingCompany, 50, 80);

  // Section 2: Commande Information
  doc.setFontSize(14);
  doc.setFont('Helvetica', 'normal');
  doc.text('Commande Information', 10, 110);
  doc.setLineWidth(0.5);
  doc.line(10, 112, 200, 112);

  doc.setFontSize(12);

  doc.text(`Client Name:`, 10, 130);
  doc.text(`${shipping.commande.nom} ${shipping.commande.prenom}`, 50, 130);

  doc.text(`Email:`, 10, 140);
  doc.text(shipping.commande.email, 50, 140);

  doc.text(`Telephone:`, 10, 150);
  doc.text(shipping.commande.numeroTel.toString(), 50, 150);

  doc.text(`Address:`, 10, 160);
  doc.text(shipping.commande.addresseLivraison, 50, 160);

  doc.text(`Total Amount:`, 10, 170);
  doc.text(`$${shipping.commande.totalAmount.toFixed(2)}`, 50, 170);

  // Section 3: Additional Information/Description
  doc.setFontSize(14);
  doc.setFont('Helvetica', 'normal');
  doc.text('Additional Information', 10, 190);
  doc.setLineWidth(0.5);
  doc.line(10, 192, 200, 192);

  doc.setFontSize(12);
  doc.setFont('Helvetica', 'normal');
  const descriptionText = `Thank you for your purchase! Please ensure that someone is available to receive the package at the shipping address provided. If you have any questions regarding your order, feel free to contact our customer service.

  Shipping Instructions:
  1. Handle the package with care.
  2. Ensure that the package is delivered to the recipient safely.
  3. In case of any issues during delivery, please contact the shipping company immediately.

 We value your trust and look forward to serving you again.`;

  const descriptionLines = doc.splitTextToSize(descriptionText, 180);
  doc.text(descriptionLines, 10, 200);

  // Section 4: Footer with Date and Signature
  doc.setFontSize(12);
  doc.setFont('Helvetica', 'normal');
  doc.text(`Shipping Date: ${new Date().toLocaleDateString()}`, 10, 270);

  doc.text('Signature:', 10, 280);
  doc.line(30, 280, 100, 280); // Signature line

  // Draw a border around the content
  doc.setLineWidth(1);
  doc.rect(5, 5, 200, 287); // (x, y, width, height)

  // Save the PDF
  doc.save(`Shipping_Label_${shipping.trackingNumber}.pdf`);
}

}
