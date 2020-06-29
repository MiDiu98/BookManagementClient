import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { AlertifyService } from 'src/app/shared/services/alertify.service';


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
  sortOrder = true;   // true: asc, false: desc

  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService
  ) {

  }

  ngOnInit(): void {
    this.getEnabledUser('id');
    this.getDisabledUser('id');
  }

  getDisabledUser(sortBy: string) {
    this.userService.getUserByAdmin(false, sortBy, this.sortOrder ? 'asc' : 'desc').subscribe(response => {
      this.disabledUsers = response;
      this.sortOrder = !this.sortOrder;
    })
  }

  getEnabledUser(sortBy: string) {
    this.userService.getUserByAdmin(true, sortBy, this.sortOrder ? 'asc' : 'desc').subscribe(response => {
      this.enabledUsers = response;
      this.sortOrder = !this.sortOrder;
    });
  }

  onDisabled(userId: number, user: User, event) {
      const checked = event.target.checked;
      if (!checked) {
        user.enable = false;
        this.userService.updateUserByAdmin(userId, user).subscribe(
          data => {
            this.alertifyService.success('Cập nhật trạng thái thành công');
            this.getEnabledUser('id');
            this.getDisabledUser('id');
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
            this.getEnabledUser('id');
            this.getDisabledUser('id');
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
              this.getEnabledUser('id');
            },
            error => {
              this.alertifyService.error('Cập nhật trạng thái không thành công');
            }
          );
        });
        this.getEnabledUser('id');
      } else {
        this.alertifyService.confirm('Bạn có chắc muốn thay đổi quyền không?', () => {
          user.roles = ['ROLE_USER'];
          this.userService.updateUserByAdmin(userId, user).subscribe(
            data => {
              this.alertifyService.success('Cập nhật trạng thái thành công');
              this.getEnabledUser('id');
            },
            error => {
              this.alertifyService.error('Cập nhật trạng thái không thành công');
            }
          );
        });
        this.getEnabledUser('id');
      }
    }

    public isAdmin(user: User): boolean {
      if (JSON.stringify(user.roles).match('(.*)ROLE_ADMIN(.*)') != null) {
          return true;
      }

      return false;
    }

    public deleteUser(userId: number) {
      this.alertifyService.confirm('Delete this user, are you sure?', () => {
        this.userService.deleteByAdmin(userId).subscribe(
          response => {
            this.alertifyService.success('Deleted');
            this.getDisabledUser('id');
          },
          error => {
            this.alertifyService.error('Delete fail');
          }
        );
      });
    }
}
