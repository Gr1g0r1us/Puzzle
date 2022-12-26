import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-createpuzzle',
  templateUrl: './createpuzzle.component.html',
  styleUrls: ['./createpuzzle.component.css']
})
export class CreatepuzzleComponent implements OnInit {
  puzzleForm!: FormGroup;
  picList:Observable<any>[] = [];
  arts:any;
  selectedItem:any;
  selectedImgId:any;
  IdPuzzle = 1;
  

  constructor(private fb: FormBuilder, private auth: SharedService, private router: Router) { 
    this.puzzleForm = this.fb.group({
      IdLevel:['',Validators.required],
      IdArt:['',Validators.required],
      IdPuzzle:['',Validators.required],
      PuzzleName:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllArts();
  }

  savePuzzle(puzzleForm:any){
    const puzzle  = {
      IdPuzzle: this.IdPuzzle+1,
      NamePuzzle: puzzleForm.controls.PuzzleName.value,
      IdArt: this.selectedImgId,
      IdLevel: puzzleForm.controls.IdLevel.value
      }
    console.log(puzzle)
    console.log(puzzleForm)
    this.auth.createPuzzle(puzzle).subscribe();
  }

  getAllArts(){
    this.auth.getArts().subscribe(x=> this.arts = x);

  }

  getArt(element:any, event:any){
    console.log(element)
    this.selectedImgId= element.IdArt;
    const hasclass = event.target.classList.contains("highlight");
    
    if(hasclass){
      event.target.classList.remove("highlight");
    }
    else{
      event.target.className+= " highlight";
    }

    if(this.selectedItem && event.target != this.selectedItem){
      this.selectedItem.className= " item-img";
    }

    this.selectedItem = event.target;
  }

}