import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router, Event as NavigationEvent  } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ContactService } from 'services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
id:any;
contacts:any=[];
loading=false;
errorMessage='';
group:any;
UpdateForm!:FormGroup;
  constructor(private route:ActivatedRoute,
              private contactService:ContactService,
              private fb:FormBuilder,
              private router:Router) { }

  ngOnInit(): void {
this.route.params.subscribe((data:any)=>{
  console.log(data);
  this.id=data.id
})
// this.id=this.route.snapshot.params['id'];
// console.log(this.id);
this.contactService.getSingleContact(this.id).subscribe((data:any)=>{
  console.log(data);
  this.contacts=data;
  this.loading=false;

  this.contactService.getallGroups().subscribe((data:any)=>{
    console.log(data);
    this.group=data;
    this.loading=false;
    
  })
  this.UpdateForm=this.fb.group({
    name:[this.contacts.name,Validators.required],
    company:[this.contacts.company,Validators.required],
    email:[this.contacts.email,Validators.required],
    title:[this.contacts.title,Validators.required],
    mobile:[this.contacts.mobile,Validators.required],
    photo:[this.contacts.photo],
    groupId:[this.contacts.groupId,Validators.required],
  })
  
}),(error:any)=>{
  this.errorMessage=error.message;
  this.loading=false;
}
//this.UpdateForm.setValue(this.contacts);

  }
UpdateContactForm(contactId:any){
  this.contactService.UpdateContact(this.UpdateForm.value,contactId).subscribe((data:any)=>{
    console.log(data);
    this.router.navigate(['/'])
  }),((error:any)=>{
    this.errorMessage=error.message;
    
  })
}
}
