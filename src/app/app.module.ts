import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./core/services/auth/auth-guard.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from "./core/services/auth/token.interceptor";
import { RestApi } from './core/services/rest.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from "./core/core.module";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren:()=>import('./component/login/login.module').then(m=>m.LoginModule)
  },
  {
    path: "register",
    loadChildren: ()=>import('./component/register/register.module').then(m=>m.RegisterModule)
  },
  {
    path: "",
    loadChildren: ()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: "**",    //  if the requested URL doesn't match any paths
    redirectTo: "dashboard"
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{ scrollPositionRestoration: 'enabled' }),
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    RestApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
