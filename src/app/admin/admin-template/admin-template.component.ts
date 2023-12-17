import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent implements OnInit{

  constructor(private authService: AuthenticationService, private router: Router){ }

  ngOnInit() {
    
  }

  handleLogout() {
    this.authService.logout().subscribe({
      next: (data) => {
        this.router.navigateByUrl("/login");
      }
    });
  }
}
