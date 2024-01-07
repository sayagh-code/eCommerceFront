import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Customer } from '../model/customer.model';
import { UUID } from 'angular2-uuid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  userFormGroup! : FormGroup;
  customer! : Customer;

  constructor(private fb : FormBuilder, private authService : AuthenticationService, private router : Router){}

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      username : this.fb.control(""),
      email : this.fb.control(""),
      phone : this.fb.control(""),
      address : this.fb.control(""),
      password : this.fb.control(""),
      confirmPassword : this.fb.control(""),
    });
  }

  handleSignUp(){
    if(this.userFormGroup.value.password!=this.userFormGroup.value.confirmPassword){
      alert("confirm your password");
    }
    else{
      this.customer={
        id: UUID.UUID(), 
        username: this.userFormGroup.value.username, 
        email: this.userFormGroup.value.email, 
        phone: this.userFormGroup.value.phone, 
        address: this.userFormGroup.value.address, 
        password: this.userFormGroup.value.password,
        role: "user",
      };
      this.authService.login(this.customer.username).subscribe({
        next:(value)=>{
          alert("User already exists");
        },
        error: ()=>{
          this.authService.signup(this.customer).subscribe({
            next: ()=>{
              this.authService.authenticateUser(this.customer).subscribe({
                next:()=>{
                  this.router.navigateByUrl("/user/home");
                }
              })
            },
          })
        },
      });
    }
  }
}