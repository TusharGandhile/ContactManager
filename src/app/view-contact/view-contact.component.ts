import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from 'services/contact.service';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {
id:any;
contacts:MyContact= {} as MyContact;
loading=false;
errorMessage='';
myGroup:MyGroup={} as MyGroup;
  constructor(private route:ActivatedRoute,private contactService:ContactService) { }

  ngOnInit(): void {
this.loading=true;
    this.id=this.route.snapshot.params['id']
    console.log(this.id);

    // this.route.paramMap.subscribe((data:any)=>{
    //   this.id=(data.get('id'));
    // })
    this.contactService.getSingleContact(this.id).subscribe((data:any)=>{
      console.log(data);
      this.contacts=data;
      this.loading=false;
      this.contactService.getGroup(data).subscribe((data:any)=>{
        console.log(data);
        this.myGroup=data;
      })
    }),((error:any)=>{
      this.errorMessage=error;
      this.loading=false;
     

    })
   
  }

  isNotEmpty(){
    return Object.keys(this.contacts).length>0;
  }
}
