import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MyContact } from 'src/app/models/myContact';
import { MyGroup } from 'src/app/models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
baseUrl='http://localhost:4000'
  constructor(private http:HttpClient) { }
  

  //contacts api//
  getallContacts():Observable<MyContact>{
    let dataUrl:string=`${this.baseUrl}/contacts`
   return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError));
  }
  getSingleContact(contactId:any){
    let dataUrl:string=`${this.baseUrl}/contacts/${contactId}`
    return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError));
  }
  CreateContact(contactDetail:any){
    let dataUrl:string=`${this.baseUrl}/contacts`
   return this.http.post<MyContact>(dataUrl,contactDetail).pipe(catchError(this.handleError));
  }
UpdateContact(contactDetail:any,contactId:any){
  let dataUrl:string=`${this.baseUrl}/contacts/${contactId}`
return this.http.put<MyContact>(dataUrl,contactDetail).pipe(catchError(this.handleError));
}

DeleteContact(contactId:any){
  let dataUrl:string=`${this.baseUrl}/contacts/${contactId}`
  return this.http.delete<MyContact>(dataUrl).pipe(catchError(this.handleError));
}

//Group api//
getallGroups():Observable<MyGroup>{
  let dataUrl:string=`${this.baseUrl}/groups`
 return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError));
}

getGroup(contacts:any){
  let dataUrl:string=`${this.baseUrl}/groups/${contacts.groupId}`
 return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError));
}

  handleError(error:HttpErrorResponse){
let errorMessage:string='';
if(error.error instanceof ErrorEvent){
  errorMessage=`Error: ${error.error.message}`
}else{
  errorMessage=`Status: ${error.status} \n Meaasge:${error.message}`

}
return throwError(errorMessage);
  }
}
