import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
declare function startGame():any;
declare function setParameters(w:Number,h:Number,r:Number,c:Number,g:Number,p:String):any;

@Component({
  selector: 'app-loadgame',
  templateUrl: './loadgame.component.html',
  styleUrls: ['./loadgame.component.scss']
})
export class LoadgameComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    setParameters(40,40,environment.rowCount,environment.columnCount,0,`url(${environment.pictureURL})`);
    startGame();
  }
  
  ngOnChange(){
  }
}