import { first } from 'rxjs/operators';
import { UserService } from './../../_services/user.service';
import { User } from './../../_models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  result: User[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getEnabledUser();
  }

  private getEnabledUser() {
    this.userService.getEnabledUser()
      .pipe(first())
      .subscribe((data) => {
        console.log(data);
        this.users = data;
        console.log(this.users);
      });
  }

}
