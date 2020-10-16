import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from "@angular/router";
import { SharedModule } from '../../core/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import {ResetPasswordDialog} from './login.component';

const ROUTE = [ 
  {
    path: "",
    component: LoginComponent,
    pathMatch:'full'
  }
];

@NgModule({
  declarations: [LoginComponent,ResetPasswordDialog],
  entryComponents: [ResetPasswordDialog],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTE),
    SharedModule,
    CoreModule.forRoot()
  ]
})
export class LoginModule { }
