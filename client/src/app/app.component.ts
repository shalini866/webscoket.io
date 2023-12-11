import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  constructor(
    public router : Router,

  ){
    
  }
  ngOnInit(): void {
    console.log('Method not implemented.');
  }
  title = 'client';

  click(){
    this.router.navigate(['/chat'])

  }
}
