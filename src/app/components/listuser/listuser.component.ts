import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared-service/user.service';
import { User } from '../../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {

  public users: User[];

  statusMessage: string;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this._userService.getUsers().subscribe((users) => {
      console.log('222', users);
      this.users = users;
    }, (error) => {
      console.log(error);
    });
  }

  deleteUser(user) {
    this._userService.deletUser(user.id).subscribe((data) => {
      this.users.splice(this.users.indexOf(user), 1);
    }, (error) => {
      console.log(error);
      this.statusMessage = 'Problem with the service. Please try again later';
    });
  }

  updateUser(user) {
    this._userService.setter(user);
    this._router.navigate(['/op']);


  }

  newUser() {
    // let user = new User();
    const user = new User();
    this._userService.setter(user);
    this._router.navigate(['/op']);
  }

}
