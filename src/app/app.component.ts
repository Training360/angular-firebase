import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './model/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-firebase';
  items: Observable<any> = this.userService.all;
  newUser: User = new User();

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {}

  onCreate(user: User): void {
    this.userService.create(user).then(
      resp => alert('New user has been added.'),
      err => alert(err.error)
    );
  }

  onUpdate(user: User): void {
    this.userService.update(user).then(
      resp => alert('User has been updated.'),
      err => alert(err.error)
    );
  }

  onDelete(user: User): void {
    if ( !confirm('Are you sure?') ) {
      return;
    }

    this.userService.delete(user).then(
      resp => alert('User has been deleted.'),
      err => alert(err.error)
    );
  }

}
