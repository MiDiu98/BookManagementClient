import { OrderEnum } from './../../../../shared/enums/sort.enum';
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
  pageSize = 20;

  enabledUsers: User[] = [];
  disabledUsers: User[] = [];
  showActiveUser = false;
  showDisabledUser = true;
  sortOrder = true;   // true: asc, false: desc
  sortBy = 'id';

  // Pagination disabled User
  currentDisabledUserPage = 0;
  public startDisabledPage = 0;
  public endDisabledPage: number;

  // Pagination enabld User
  currentEnabledUserPage = 0;
  public startEnabledPage = 0;
  public endEnabledPage: number;

  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService
  ) {

  }

  ngOnInit(): void {
    this.getEnabledUser(this.currentEnabledUserPage, this.pageSize, this.sortBy);
    this.getDisabledUser(this.currentDisabledUserPage, this.pageSize, this.sortBy);
  }

  getDisabledUser(pageNo: number = 0, pageSize: number = 10, sortBy: string) {
    this.sortBy = sortBy;
    this.userService.getUserByAdmin(false, pageNo, pageSize, sortBy,
      this.sortOrder ? OrderEnum.ASC : OrderEnum.DESC)
      .subscribe(response => {
      this.disabledUsers = response.usersDto;
      this.currentDisabledUserPage = response.currentPage;
      this.endDisabledPage = response.totalPages - 1;
    });
  }

  getEnabledUser(pageNo: number = 0, pageSize: number = 10, sortBy: string) {
    this.sortBy = sortBy;
    this.userService.getUserByAdmin(true, pageNo, pageSize, sortBy, this.sortOrder ? OrderEnum.ASC : OrderEnum.DESC).subscribe(response => {
      this.enabledUsers = response.usersDto;
      this.currentEnabledUserPage = response.currentPage;
      this.endEnabledPage = response.totalPages - 1;
    });
  }

  onDisabled(userId: number, user: User, event) {
      const checked = event.target.checked;
      if (!checked) {
        user.enable = false;
        this.userService.updateUserByAdmin(userId, user).subscribe(
          data => {
            this.alertifyService.success('Update status successful');
            this.getEnabledUser(this.currentEnabledUserPage, this.pageSize, this.sortBy);
            this.getDisabledUser(this.currentDisabledUserPage, this.pageSize, this.sortBy);
          },
          error => {
            this.alertifyService.error('Update status fail');
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
            this.alertifyService.success('Update status successful');
            this.getEnabledUser(this.currentEnabledUserPage, this.pageSize, this.sortBy);
            this.getDisabledUser(this.currentDisabledUserPage, this.pageSize, this.sortBy);
          },
          error => {
            this.alertifyService.error('Update status fail');
          }
        )
      }
    }

    public updateRole(userId: number, user: User, event) {
      const checked = event.target.checked;
      if (checked) {
        this.alertifyService.confirm('Update role of this user, are you sure?', () => {
          user.roles = ['ROLE_ADMIN', 'ROLE_USER'];
          this.userService.updateUserByAdmin(userId, user).subscribe(
            data => {
              this.alertifyService.success('Update status successful');
              this.getEnabledUser(this.currentEnabledUserPage, this.pageSize, this.sortBy);
            },
            error => {
              this.alertifyService.error('Update status fail');
            }
          );
        });
        this.getEnabledUser(this.currentEnabledUserPage, this.pageSize, this.sortBy);
      } else {
        this.alertifyService.confirm('Update role of this user, are you sure?', () => {
          user.roles = ['ROLE_USER'];
          this.userService.updateUserByAdmin(userId, user).subscribe(
            data => {
              this.alertifyService.success('Update status successful');
              this.getEnabledUser(this.currentEnabledUserPage, this.pageSize, this.sortBy);
            },
            error => {
              this.alertifyService.error('Update status fail');
            }
          );
        });
        this.getEnabledUser(this.currentEnabledUserPage, this.pageSize, this.sortBy);
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
            this.getDisabledUser(this.currentDisabledUserPage, this.pageSize, this.sortBy);
          },
          error => {
            this.alertifyService.error('Delete fail');
          }
        );
      });
    }

      // Pagination for enabled Users

  public getNextEnabledPage() {
    this.getEnabledUser(this.currentEnabledUserPage + 1, this.pageSize, this.sortBy);
  }

  public getPrevEnabledPage() {
    this.getEnabledUser(this.currentEnabledUserPage - 1, this.pageSize, this.sortBy);
  }

  public getStartEnabledPage() {
    this.getEnabledUser(this.startEnabledPage, this.pageSize, this.sortBy);
  }

  public getEndEnabledPage() {
    this.getEnabledUser(this.endEnabledPage, this.pageSize, this.sortBy);
  }

  // Pagination for disabled Users

  public getNextDisabledPage() {
    this.getDisabledUser(this.currentDisabledUserPage + 1, this.pageSize, this.sortBy);
  }

  public getPrevDisabledPage() {
    this.getDisabledUser(this.currentDisabledUserPage - 1, this.pageSize, this.sortBy);
  }

  public getStartDisabledPage() {
    this.getDisabledUser(this.startDisabledPage, this.pageSize, this.sortBy);
  }

  public getEndDisabledPage() {
    this.getDisabledUser(this.endDisabledPage, this.pageSize, this.sortBy);
  }
}
