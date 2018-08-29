import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  mail() {
    window.open('mailto:admin@eazycart.com?subject=404 on URL ' + this.router.url + '&body=Query', '_self');
  }

}
