import { Component, OnInit } from '@angular/core';
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
    startGame();
    setParameters(30,30,3,3,0,"url(https://cq.ru/storage/uploads/posts/1020636/4bada763f83c45653c9ffb4c8fa22091.jpg)");
  }
  
  ngOnChange(){
    console.log();
  }
}