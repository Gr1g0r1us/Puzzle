import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-listpuzzle',
  templateUrl: './listpuzzle.component.html',
  styleUrls: ['./listpuzzle.component.css']
})
export class ListpuzzleComponent implements OnInit {
  puzzles: any;
  displayedColumns: string[] = ['IdPuzzle', 'NamePuzzle', 'IdLevel', 'IdArt', 'Do'];


  constructor(private fb: FormBuilder, private auth: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getPuzzles().subscribe(val=>{ 
      this.puzzles = val 
      console.log(this.puzzles)}
    )
  }

  deletePuzzle(element:any){
    console.log(element)
    this.auth.deletePuzzle(element).subscribe()
    this.ngOnInit()
  }


}
