import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent implements OnInit{

  isAuth! : boolean;

  constructor(private authService: AuthenticationService, private router: Router){ }

  ngOnInit() {
    this.isAuth=this.authService.isAuthenticated();
  }

  handleLogout() {
    this.authService.logout().subscribe({
      next: (data) => {
        this.router.navigateByUrl("/login");
      }
    });
  }
}
