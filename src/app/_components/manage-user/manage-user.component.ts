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
        user.enable = false;
        this.userService.updateUserByAdmin(userId, user).subscribe(
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
        user.enable = true;
        this.userService.updateUserByAdmin(userId, user).subscribe(
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

    public updateRole(userId: number, user: User, event) {
      const checked = event.target.checked;
      if (checked) {
        this.alertifyService.confirm('Bạn có chắc muốn thay đổi quyền không?', () => {
          user.roles = ['ROLE_ADMIN', 'ROLE_USER'];
          this.userService.updateUserByAdmin(userId, user).subscribe(
            data => {
              this.alertifyService.success('Cập nhật trạng thái thành công');
              this.getEnabledUser();
            },
            error => {
              this.alertifyService.error('Cập nhật trạng thái không thành công');
            }
          );
        });
        this.getEnabledUser();
      } else {
        this.alertifyService.confirm('Bạn có chắc muốn thay đổi quyền không?', () => {
          user.roles = ['ROLE_USER'];
          this.userService.updateUserByAdmin(userId, user).subscribe(
            data => {
              this.alertifyService.success('Cập nhật trạng thái thành công');
              this.getEnabledUser();
            },
            error => {
              this.alertifyService.error('Cập nhật trạng thái không thành công');
            }
          );
        });
        this.getEnabledUser();
      }
    }

    public isAdmin(user: User): boolean {
      if (JSON.stringify(user.roles).match('(.*)ROLE_ADMIN(.*)') != null) {
          return true;
      }

      return false;
    }

}
