import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'services/contact.service';
import { MyContact } from '../models/myContact';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss']
})
export class ContactManagerComponent implements OnInit {

     contacts:MyContact[]=[];
  loading=false;
  errorMessage:string='';
  searchText:any

  constructor(private contactService:ContactService,private router:Router) { }

  ngOnInit(): void {
    this.loading=true;
this.contactService.getallContacts().subscribe((data:any)=>{
  console.log(data);
  this.contacts=data;
  this.loading=false;
}),(error:any)=>{
  this.errorMessage=error.message;
  this.loading=false;
}

  }

  viewContact(id:any){
this.router.navigate(['viewContact/',id]);
  }

  EditContact(id:any){
    this.router.navigate(['editContact/',id]);
  }

  DeleteContact(contactId:any){
    this.contactService.DeleteContact(contactId).subscribe((data:any)=>{
      console.log(data);
    this.ngOnInit();
      
    }),((error:any)=>{
      this.errorMessage=error;
    })
  }
}
