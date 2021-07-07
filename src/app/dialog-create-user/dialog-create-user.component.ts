import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-create-user',
  templateUrl: './dialog-create-user.component.html',
  styleUrls: ['./dialog-create-user.component.css']
})
export class DialogCreateUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogCreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
