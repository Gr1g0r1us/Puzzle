import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  singupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: SharedService, private router: Router) { }

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
      ckeck1: Boolean;
      
      if(this.singupForm.value.password!=this.singupForm.value.repeatPassword){
        alert('Пароли не совпадают!');
        return;
      }
        this.auth.singup(this.singupForm.value)
        .subscribe({
          next:(res=>{
            alert(res.Message);
            this.singupForm.reset;
          }),
          error:(err=>{
            alert(err?.error.Message)
          })
        })
      
    }
    else{
      alert('Заполните все поля!');
    }
  }
}
