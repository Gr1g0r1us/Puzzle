import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createpuzzle',
  templateUrl: './createpuzzle.component.html',
  styleUrls: ['./createpuzzle.component.css']
})
export class CreatepuzzleComponent implements OnInit {
  game: GAME[] =[];

  constructor() { 
    if(typeof(Storage)!== "undefined"){
      const games = localStorage.getItem('puzzle');
      this.game = games ? JSON.parse(games) :[];
    }
  }

  getGames(){
    return this.game;
  }

  // save(game: { id: any; levelId?: number; folder?: string; image?: string; time?: string; moves?: number; }){
  //   const count = this.games.length;
  //   game.id = count ? this.games[count-1].id + 1 : 0;
  //   this.games.push(game);
  //   localStorage.puzzle = JSON.stringify(this.games);
  // }

  // delete(id){
  //   this.games = this.games.filter((game) => game.id !== id);
  //   localStorage.puzzle = JSON.stringify(this.games);
  // }

  ngOnInit(): void {
  }

}

export type GAME = {id: number, levelId: number, folder: string, image: string, time: string, moves: number};