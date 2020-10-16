import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "./services/auth/auth-guard.service";
import { ModuleWithProviders } from "@angular/core";
import { GlobalErrorHandler } from "./services/error-handler";
import { NotificationService } from "./services/notification.service";
import { AuthService } from "./services/auth/auth.service";


@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [],
  exports: [],
  providers: [
    AuthGuard,
    AuthService,
    GlobalErrorHandler,
    NotificationService,    
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
        ngModule: CoreModule
    };
 }
}
