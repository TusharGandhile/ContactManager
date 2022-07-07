import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactManagerComponent } from './contact-manager/contact-manager.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ViewContactComponent } from './view-contact/view-contact.component';

const routes: Routes = [
  {path:'',redirectTo:'contactManager',pathMatch:'full'},
  {path:'addContact',component:AddContactComponent},
  {path:'editContact/:id',component:EditContactComponent},
  {path:'contactManager',component:ContactManagerComponent},
  {path:'viewContact/:id',component:ViewContactComponent},
  {path:'spinner',component:SpinnerComponent},
  {path:'**',component:PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
