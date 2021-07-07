import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../users/user.service';
@Component({
  selector: 'app-dialog-create-user',
  templateUrl: './dialog-create-user.component.html',
  styleUrls: ['./dialog-create-user.component.css']
})
export class DialogCreateUserComponent implements OnInit {
  public createuserform: FormGroup;
  errmsg: string;
  constructor(
    public dialogRef: MatDialogRef<DialogCreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userservice:UserService
  ) { }

  ngOnInit(): void {
    console.log(this.data.user);
    this.createuserform = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      // image: ['']
    });
    if(this.data.user) {
      this.createuserform.patchValue({
        firstName: this.data.user.firstName,
        lastName: this.data.user.lastName,
        email: this.data.user.email,
        phoneNumber: this.data.user.phoneNumber
        // firstName: this.data.user.firstName,
      })
    }
  }
  createUser() {
    this.userservice.createuser(this.createuserform.value).subscribe(
      (res:any) => {
        console.log(res);
        this.close(res);
    },
      (error: any) => {
        // console.log(error);
        this.errmsg = error.error;
      });

  }

  updateUser() {
    this.userservice.updateuser(this.createuserform.value, this.data.user._id).subscribe(
      (res:any) => {
        console.log(res);
        this.close(res);
    },
      (error: any) => {
        // console.log(error);
        this.errmsg = error.error;
      });

  }
  close(data: any): void {
    this.dialogRef.close(data);
  }

}
