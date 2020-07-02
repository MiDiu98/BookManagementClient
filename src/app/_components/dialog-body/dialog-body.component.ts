import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {
  }

  public close() {
      // this.dialogRef.afterClosed().subscribe(_ => {
      //   console.log('Thanks for using me!');
      // });
  }
}
