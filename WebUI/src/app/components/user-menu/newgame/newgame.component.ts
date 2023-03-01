import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { environment } from 'src/environments/environment';

declare function startGame():any;
declare function setParameters(w:Number,h:Number,r:Number,c:Number,g:Number,p:String):any;

@Component({
  selector: 'app-newgame',
  templateUrl: './newgame.component.html',
  styleUrls: ['./newgame.component.css']
})
export class NewgameComponent implements OnInit {
  puzzles: any;

  levelID: any;
  rows: any;
  columns: any; 

  artURL = "../../../../src/assets/imgs/"

  

  art: any;

  displayedColumns: string[] = ['IdPuzzle', 'NamePuzzle', 'IdLevel', 'IdArt', 'Do'];

  constructor(private fb: FormBuilder, private auth: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getPuzzles().subscribe(val=>{ 
      this.puzzles = val 
      console.log(this.puzzles)}
    )
  }

  async loadLevelInfo(element:any){
    await this.auth.getPuzzleLevel(element).subscribe(x=>{
      this.rows = x.Weight,
      this.columns = x.Height
      console.log(this.rows,this.columns)
      environment.columnCount = this.columns
      environment.rowCount = this.rows
    })
  }

  async loadArtInfo(element:any){
    await this.auth.getPuzzleArt(element).subscribe(x=>{
      this.art = this.artURL + x.IdArt
      console.log(this.art)
      environment.pictureURL = this.art
    })
  }


  async wait(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async loadGame(element:any){
    
    this.loadArtInfo(element)
    this.loadLevelInfo(element)
    
    await this.wait(3000)
    console.log(123)
    this.router.navigate(['loadgame'],{queryParams:{id:element.IdPuzzle}})
    
  }
}
