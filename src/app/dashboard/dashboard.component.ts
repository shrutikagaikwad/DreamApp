import { Component } from '@angular/core';
import { BreakpointObserver } from "@angular/cdk/layout";
import { Menu,USER_MENU_ITEMS } from "../data";
import { AuthService } from "../core/services/auth/auth.service"; 


const OPERATOR_MENU_GAP_LARGE = 64;
const OPERATOR_MENU_GAP_SMALL = 54;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  menus: Menu[];
  public year=new Date().getFullYear();

  constructor(private auth: AuthService,private breakpointObserver: BreakpointObserver,private user: AuthService) {
    this.menus=this.getMenu();
  }

  getMenu() {
    let menu: Menu[] = [];
    menu.push(...USER_MENU_ITEMS);
    return menu;
  }

  onLogout() {
    this.auth.logout();
  }

  get extraSmallScreen() {
    return this.breakpointObserver.isMatched("(max-width: 1020px)");
  }

  get smallScreen() {
    return this.breakpointObserver.isMatched("(max-width: 1440px)");
  }

  get extraLargeScreen() {
    return this.breakpointObserver.isMatched("(min-width: 2000px)");
  }

  get menuGap() {
    return this.extraSmallScreen
      ? OPERATOR_MENU_GAP_SMALL
      : OPERATOR_MENU_GAP_LARGE;
  }
}
