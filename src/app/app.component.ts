import { Component } from '@angular/core';
import {UserService} from './user.service'



export class Employee {
    public name: string;
    public job: string;
}


@Component({
  selector: 'my-app',
  
  template: ` <div>
    <button (click)="loadUser()">Load profile</button>
    {{ profile | json }}
    <div *ngFor="let data of profile">
        <li>{{data.title}}</li>
        <li>{{data.description}}</li>
        <li>{{data.url}}</li>
    </div>
    <p *ngIf="postResponse !== undefined">Inserted record id: {{postResponse}}</p>
    <form (ngSubmit)="submit(employee)" #crisisForm="ngForm">
  name:<br>
  <input type="text" [(ngModel)]="employee.name" name="name"><br>
   job:<br>
  <input type="text" [(ngModel)]="employee.job" name="job"><br>
  <button type="submit">Submit</button>
</form>
    
  </div>`,
  providers: [UserService]
})
export class AppComponent { 
  
  public employee: Employee;
  public postResponse: string;
constructor(private userService: UserService) {
  this.employee = new Employee();
}
  profile: any[] = [];

  loadUser() {
    this.userService.getUser().subscribe(data => this.profile = data);
    console.log(this.profile);
  }
  public submit(employee: Employee) {
      console.log(employee);
      this.userService.postUser(employee).subscribe((res) => {
          this.postResponse = res.id;
      })
  }
  
  }
