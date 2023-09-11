import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private router : Router)
  {

  }

  logout(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }
}
