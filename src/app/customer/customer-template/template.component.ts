import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent implements OnInit{

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
