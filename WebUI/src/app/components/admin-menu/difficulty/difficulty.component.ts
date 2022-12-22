import { Component, OnInit } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.css']
})
export class DifficultyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
