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
  users: User[];
  result: User[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  private getAllUser() {
    this.userService.getAllUser()
      .pipe(first())
      .subscribe((data: User[]) => {
        console.log(data);
        for (let index = 0; index < 5; index++) {
          const element = data[index];
          this.result.push(element);
        }
      });
  }

}
