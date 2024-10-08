import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';  // Import UserService and User interface

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  showUsers = true;
  users: User[] = [];  

  constructor(private userService: UserService) { }  

  ngOnInit(): void {
    // Fetch the users when the component initializes
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  toggleUsers() {
    this.showUsers = !this.showUsers;
  }
}
