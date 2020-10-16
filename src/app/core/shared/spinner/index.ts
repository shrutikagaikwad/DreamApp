import { NgModule, Component, Input } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html", 
  styleUrls: ["./spinner.component.scss"] 
})
export class SpinnerComponent {
  @Input() stroke: number = 6;
  @Input() diameter: number = 60;
}

@NgModule({
  imports: [MatProgressSpinnerModule],
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent]
})
export class SpinnerModule {}

