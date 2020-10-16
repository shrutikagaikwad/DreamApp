import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from "@angular/forms";
import { AuthService } from "../../core/services/auth/auth.service";
import { GlobalErrorHandler } from "../../core/services/error-handler";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';

const DIALOG_OPTIONS = {
  height: 'auto',
  width: '500px',
  disableClose: true
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  login: FormGroup;
  loading: boolean;
  errMessage: string;
  role:string;
  show_button: Boolean = false;
  show_eye: Boolean = false;
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }

  constructor(private alert: NotificationService,public dialog: MatDialog,private fb: FormBuilder,public user: AuthService,private error: GlobalErrorHandler, public router: Router) {
    this.login = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", Validators.required]
    });
  }


  ngOnInit() {
  }

  onSubmit() {
    if (this.login.valid) {
      this.reset(false);
      const { email, password } = this.login.value;
      this.user.login(email,password).subscribe(
        res => { 
          console.log("status"),
          this.success(res);
        },
        err => this.handleError(err)
      );
     }
  }
  
 
  resetPasswordOperation() {
    const dialogRef = this.dialog.open(ResetPasswordDialog, {
      ...DIALOG_OPTIONS,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }


  private handleError(err, id = 0) {
    if(err.message){
      err.status=2;
    }
    this.reset(true);
    this.errMessage = this.error.getErrorMessage(err.status ? err.status : id);
  }

  private reset(status) {
    this.errMessage = "";
    this.loading = !status;
    status ? this.login.enable() : this.login.disable();
  }

  private success(status) {
    this.alert.notify('Welcome user','ok');
    status ? this.router.navigate(["/dashboard"]) : this.handleError("", 2);
  }


}



// dialog for reset password

@Component({
  selector: 'resetDialog',
  templateUrl: 'resetDialog.html',
  styleUrls: ['./login.component.scss']
})
export class ResetPasswordDialog {
  loading: boolean = false;
  reset: FormGroup;

  constructor(
    private alert: NotificationService,
    public dialogRef: MatDialogRef<ResetPasswordDialog>,
    private fb: FormBuilder,
    private error: GlobalErrorHandler,
    public user: AuthService) {
    this.reset = this.fb.group({
      email: ['', [Validators.required]],
      password: ["", [Validators.required,Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})')]],
      confirm_password: ["", Validators.required]
    },
    {
      validator: MustMatch('password', 'confirm_password')
    });
  }

  onSubmit() {
    this.reset.disable();
    this.loading = true;
    const {password,email}=this.reset.value;
    this.alert.notify('Reset Password successfully.','ok');
    this.dialogRef.close(true);
    //call API
    
  }

  handleError(errID) {
    this.error.getErrorMessage(errID);
  }

}


function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}