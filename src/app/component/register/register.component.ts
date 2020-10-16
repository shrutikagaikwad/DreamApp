import { Component, Inject }                        from '@angular/core';
import { FormGroup, FormBuilder, Validators }       from '@angular/forms';
import { AuthService }                              from '../../core/services/auth/auth.service';
import { GlobalErrorHandler }                       from '../../core/services/error-handler';
import { Router }                                   from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    register: FormGroup;
    loading: boolean;
    errMessage: string;
    show_button: Boolean = false;
    show_eye: Boolean = false;
    maxFromDate: Date;
    showPassword() {
        this.show_button = !this.show_button;
        this.show_eye = !this.show_eye;
    }

    constructor(private alert: NotificationService,private fb: FormBuilder, private user: AuthService, private error: GlobalErrorHandler, public router: Router) {
        this.register = this.fb.group({
            email: ['', [Validators.required]],
            firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(20)]],
            lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(20)]],
            password: ['', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,50})')]],
            address:['',[Validators.required,Validators.maxLength(20)]],
            dob:['',Validators.required],
            company:['',[Validators.required,Validators.maxLength(20)]]
        });
        this.maxFromDate = new Date();
    }

    onSubmit() {
        if (this.register.valid) {
            this.reset(false);
            this.user.register(this.register.value).subscribe(
                (res: any) => {
                    if (res) {
                      this.alert.notify('User Register successfully','ok');
                      this.router.navigate(['login']);
                    } else {
                        this.alert.notify('User Register failed','ok');
                        this.handleError(3)
                    }
                },
                err => {
                    this.handleError(err.status);
                }
            );
        }
    }

    private handleError(err) {
        this.reset(true);
        this.errMessage = this.error.getErrorMessage(err);
    }

    private reset(status) {
        this.errMessage = '';
        this.loading = !status;
        status ? this.register.enable() : this.register.disable();
    }
    
    onChangesDate(event){  
        if(event.value){
            let dob=this.formatDate(event.value.toString());
            this.register.controls['dob'].setValue(dob);
        }
      
    }

    formatDate(str) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }


}

