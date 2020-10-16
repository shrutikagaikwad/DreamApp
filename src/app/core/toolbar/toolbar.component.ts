import { Component, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent {
  
  @Output() toggle = new EventEmitter<boolean>();
 
  constructor(private breakpointObserver: BreakpointObserver) {
   
  }
  open() {
    this.toggle.emit(true);
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


  
}
