import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: SharedService, private router: Router) { }

  ngOnInit(): void {
  }

  onNewGame(){
    this.router.navigate(['newgame']);
  }

  onLoadGame(){
    this.router.navigate(['loadgame']);
  }
  
  onExit(){
    this.router.navigate(['login']);
  }
}
