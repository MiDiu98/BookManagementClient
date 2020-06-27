import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users: User[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getEnabledUser();
  }

  private getEnabledUser(): void {
    this.userService.getEnabledUser()
      .pipe(first())
      .subscribe((data: User[]) => {
        console.log(data);
        this.users = data;
        console.log(this.users);
      });
  }

}
