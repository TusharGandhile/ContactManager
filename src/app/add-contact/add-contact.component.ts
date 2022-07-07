import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
AddContact!:FormGroup;
group:any[]=[];
loading=false;
errorMessage='';
img:any;
srcResult:any;
  constructor(private fb:FormBuilder,
              private contactService:ContactService,
              private router:Router) { }

  ngOnInit(): void {
this.loading=true;
 
this.contactService.getallGroups().subscribe((data:any)=>{
  console.log(data);
  this.group=data;
  this.loading=false;
  
})
this.AddContact=this.fb.group({
            name:['',Validators.required],
            company:['',Validators.required],
            email:['',Validators.required],
            title:['',Validators.required],
            mobile:['',Validators.required],
             photo:[''],
            groupId:[''],
})


  }
  AddNewContact(){
    console.log(this.AddContact.value);
    console.log(this.img);
    this.AddContact.value.photo=this.srcResult;
    this.contactService.CreateContact(this.AddContact.value).subscribe((data:any)=>{
    this.router.navigate(['/']).then();

    }),((error:any)=>{
      this.router.navigate(['addContact']).then();
      this.errorMessage=error;
    })
  }
  onFileSelected(event: any) {
    console.log(event.target.files[0]);
    this.img=event.target.files[0]
    if(event.target.files[0]){
   const reader= new FileReader();
   reader.readAsDataURL(event.target.files[0])
   reader.onload=(event)=>{
     this.srcResult=reader.result;
     console.log(this.srcResult);
     
   }
   }
  }
}
