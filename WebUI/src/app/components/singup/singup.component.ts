import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  singupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: SharedService) { }

  ngOnInit(): void {
    this.singupForm = this.fb.group({
      login:['',Validators.required],
      password:['',Validators.required],
      repeatPassword:['',Validators.required]
    })
  }

  onSingup(){
    if(this.singupForm.valid)
    {
      console.log(this.auth.singup);
      this.auth.singup(this.singupForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message)
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
    }
  }

}
