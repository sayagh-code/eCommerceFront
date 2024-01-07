import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, JsonPipe, CommonModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  
  userFormGroup! : FormGroup;
  errorMessage : any;

  constructor(private fb : FormBuilder, private authService : AuthenticationService, private router : Router) {
  }

  ngOnInit() {
    this.userFormGroup = this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control(""),
    });
  }

  handleLogin() {
    let username=this.userFormGroup.value.username;
    let password=this.userFormGroup.value.password;
    this.authService.login(username).subscribe({
      next :(appUser)=>{
        if(appUser.password!=password)
          this.errorMessage="Wrong password";
        else
          this.authService.authenticateUser(appUser).subscribe({
            next : (data)=>{
              if(this.authService.hasRole("admin"))
                this.router.navigateByUrl("/admin/products");
              else
                this.router.navigateByUrl("/user/home");
            }
          });
      },
      error :(err)=>{
        this.errorMessage = "User Not found";
      }
    })
  }
}