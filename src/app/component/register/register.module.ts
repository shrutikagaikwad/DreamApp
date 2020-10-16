import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../core/shared/shared.module";
import { CoreModule } from "../../core/core.module";

const ROUTE = [
  {
    path: "",
    component: RegisterComponent,
    pathMatch:'full'
  }
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTE),
    SharedModule,
    CoreModule
  ]
})
export class RegisterModule { }
