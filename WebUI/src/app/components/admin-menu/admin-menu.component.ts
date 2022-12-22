import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: SharedService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(){
    this.router.navigate(['createpuzzle']);
  }

  onGetPuzzleList(){
    this.router.navigate(['listpuzzle']);
  }

  onGetGalery(){
    this.router.navigate(['gallery']);
  }

  onDifficulty(){
    this.router.navigate(['difficulty']);
  }

  onExit(){
    this.router.navigate(['login']);
  }
}
