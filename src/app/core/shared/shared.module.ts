import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ErrorModule } from "./error";
import { SpinnerModule } from "./spinner";

const ShareModules = [
  MaterialModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  FormsModule,
  ErrorModule,
  SpinnerModule
];

@NgModule({
  imports: [...ShareModules],
  exports: [...ShareModules]
})
export class SharedModule {}

