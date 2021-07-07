import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogCreateUserComponent } from '../dialog-create-user/dialog-create-user.component';
import { UserService } from './user.service';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;
  errmsg: string;
  constructor(private dialog: MatDialog, private userservice: UserService, private toastservice: HotToastService) { }

  ngOnInit(): void {
    this.getusers();
  }
  getusers() {
    this.userservice.getallusers()
           .subscribe(
          (res: any) => {
            this.users = res;
          },
          (error) => {
            console.log(error);
            this.errmsg = error;
          }
        );
  }
  deleteuser(id: number) {
    this.userservice.deleteuser(id)
           .subscribe(
          (res: any) => {
            if (res.success) {
              // console.log(res.msg);
              this.toastservice.success('Deleted User Successfully.');
              this.getusers();
            }
          },
          (error) => {
            console.log(error);
            this.errmsg = error;
          }
        );
  }
  openUserDialog(user?: any) {
    const dialogRef = this.dialog.open(DialogCreateUserComponent, {
      width: '60%',
      data:{
        user: user
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(user) {
      this.toastservice.success('User Added Successfully.');
     } else {
      this.toastservice.success('User Updated Successfully.');
     }
      this.getusers();
    });

  }
}
