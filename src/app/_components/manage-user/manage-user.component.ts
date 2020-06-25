import { UserService } from './../../_services/user.service';
import { User } from './../../_models/user.model';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  enabledUsers: User[] = [];
  disabledUsers: User[] = [];
  showActiveUser = false;
  showDisabledUser = true;

  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService
  ) {

  }

  ngOnInit(): void {
    this.getEnabledUser();
    this.getDisabledUser();
  }

  getDisabledUser() {
    this.userService.getUserByAdmin(false).subscribe(response => {
      this.disabledUsers = response;
    })
  }

  getEnabledUser() {
    this.userService.getUserByAdmin(true).subscribe(response => {
      this.enabledUsers = response;
    });
  }

  onDisabled(userId: number, user: User, event) {
      const checked = event.target.checked;
      if (!checked) {
        this.userService.updateUserByAdmin(userId, user, false).subscribe(
          data => {
            this.alertifyService.success('Cập nhật trạng thái thành công');
            this.getEnabledUser();
            this.getDisabledUser();
          },
          error => {
            this.alertifyService.error('Cập nhật trạng thái không thành công');
          }
        )
      }
    }

    onEnabled(userId: number, user: User, event) {
      const checked = event.target.checked;
      if (checked) {
        this.userService.updateUserByAdmin(userId, user, true).subscribe(
          data => {
            this.alertifyService.success('Cập nhật trạng thái thành công');
            this.getEnabledUser();
            this.getDisabledUser();
          },
          error => {
            this.alertifyService.error('Cập nhật trạng thái không thành công');
          }
        )
      }
    }

}
