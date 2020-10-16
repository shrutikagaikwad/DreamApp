import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from "@angular/router";
import { CoreModule } from "../core/core.module";
import { SharedModule } from "../core/shared/shared.module";
import {ToolbarComponent} from "../core/toolbar/toolbar.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  }
];  
@NgModule({
  declarations: [DashboardComponent,ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    SharedModule
  ]
})
export class DashboardModule { }
