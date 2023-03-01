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
    https://github.com/Gr1g0r1us/Puzzle/blob/main/WebUI/src/assets/imgs/1645936030_25-kartinkin-net-p-kartinki-dlya-pazlov-27.jpg
    startGame();
    setParameters(40,40,environment.rowCount,environment.columnCount,0,`url(${environment.pictureURL})`);
  }
  
  ngOnChange(){
    console.log();
  }
}